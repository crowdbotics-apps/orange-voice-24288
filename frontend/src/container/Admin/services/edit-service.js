
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Input,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryActions } from '../../../store/actions/CategoryActions';
import { ServiceActions } from '../../../store/actions/ServiceActions';
import { API_URL } from '../../../store/services/Config';


function EditSerivce({ history }) {

    const dispatch = useDispatch();
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [imageNotValid, setImageNotValid] = useState({ error: false, type: '', message: '' });
    const categories = useSelector(store => store?.category?.categories);
    const isProgress = useSelector(store => store?.service?.isProgress);
    // const [error, setError] = useState({ isError: false, message: '' });
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        shortDescription: '',
        price: 0,
        minQty: 0,
        isActive: true,
        categoryId: '',
        file: null,
        image: '',
        removeImage: false,
        id: 0,

    });

    useEffect(() => {
        let service = history?.location?.state?.service;
        if (service) {

            let {
                title,
                description,
                shortDescription,
                price,
                minQty,
                isActive,
                categoryId,
                image,
                removeImage,
                id
            } = service;


            setFormValues({
                title,
                description,
                shortDescription,
                price,
                minQty,
                isActive,
                categoryId,
                image,
                removeImage,
                id
            });


            dispatch(CategoryActions.getCategories(1, 1000));
        }
        else {
            history.goBack();
        }
    }, [dispatch, history]);


    const onImageSelect = useCallback((e) => {
        let img;
        let _URL = window.URL || window.webkitURL;
        let file = e.target.files[0];
        if (file) {
            let fileSizeInMB = file?.size / 1000000;
            img = new Image();
            let objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                if (this.height < 512) {
                    setImageNotValid({ error: true, message: 'Image dimensions must be atleast 512x512' });
                }
                else if (this.width < 512) {
                    setImageNotValid({ error: true, message: 'Image dimensions must be atleast 512x512' });
                }
                else if (fileSizeInMB > 4) {
                    setImageNotValid({ error: true, message: 'File size is exceeding 4MB' });
                }
                else if (imageNotValid.error) {
                    setImageNotValid({ error: false, message: '' });
                }
            };
            setFormValues({ ...formValues, file: file });
            img.src = objectUrl;
        } else {
            setImageNotValid({ error: false, message: '' });
            setFormValues({ ...formValues, file: file });
        }
    }, [formValues, imageNotValid]);



    const editService = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.title) {
            setNotValid({ error: true, type: 'title', message: 'Please provide title' });
            return;
        }
        if (formValues.title.length < 3) {
            setNotValid({ error: true, type: 'title', message: 'Title is too short' });
            return;
        }
        if (formValues.categoryId === '') {
            setNotValid({ error: true, type: 'categoryId', message: 'Please select category' });
            return;
        }
        if (!formValues.description) {
            setNotValid({ error: true, type: 'description', message: 'Please provide description' });
            return;
        }
        if (formValues.description.length < 25) {
            setNotValid({ error: true, type: 'description', message: 'Description must contain min 25 characters' });
            return;
        }
        if (formValues.description.length > 250) {
            setNotValid({ error: true, type: 'description', message: 'Description exceed 250 characters ' });
            return;
        }
        if (!formValues.shortDescription) {
            setNotValid({ error: true, type: 'shortDescription', message: 'Please provide short description' });
            return;
        }
        if (formValues.shortDescription.length < 15) {
            setNotValid({ error: true, type: 'shortDescription', message: 'Short description must contain 15 characters' });
            return;
        }
        if (formValues.shortDescription.length > 25) {
            setNotValid({ error: true, type: 'shortDescription', message: 'Short description exceed 25 characters' });
            return;
        }
        if (!formValues.minQty) {
            setNotValid({ error: true, type: 'minQty', message: 'Please provide min order qty' });
            return;
        }
        if (Number(formValues.minQty) === 0) {
            setNotValid({ error: true, type: 'minQty', message: 'Minimum order qty could not be zero' });
            return;
        }
        if (Number(formValues.minQty) < 0) {
            setNotValid({ error: true, type: 'minQty', message: 'Negative number not allow in min qty' });
            return;
        }
        if (Number(formValues.minQty) > 9999) {
            setNotValid({ error: true, type: 'minQty', message: 'Min qty should not exceed 9999' });
            return;
        }
        if (!formValues.price) {
            setNotValid({ error: true, type: 'price', message: 'Please provide price' });
            return;
        }
        if (Number(formValues.price) === 0) {
            setNotValid({ error: true, type: 'price', message: 'Price could not be zero' });
            return;
        }
        if (Number(formValues.price) < 0) {
            setNotValid({ error: true, type: 'price', message: 'Negative number not allow in price' });
            return;
        }
        if (!(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/).test(formValues.price)) {
            setNotValid({ error: true, type: 'price', message: 'Price must be a number with upto 2 decimal places' });
            return;
        }
        if (Number(formValues.price) > 9999) {
            setNotValid({ error: true, type: 'price', message: 'Price should not exceed 9999' });
            return;
        }
        if (formValues.file && imageNotValid.error) {
            return;
        }
        let formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('categoryId', Number(formValues.categoryId));
        formData.append('description', formValues.description);
        formData.append('shortDescription', formValues.shortDescription);
        formData.append('minQty', Number(formValues.minQty));
        formData.append('price', parseFloat(formValues.price));
        formData.append('imageFile', formValues.file);
        formData.append('removeImage', formValues.removeImage);
        formData.append('id', formValues.id);
        dispatch(ServiceActions.editService(formData, history));

    }, [formValues, dispatch, history, imageNotValid, notValid]);
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Update Service</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={editService} >
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className="text-danger" >*</span> Title </Label>
                                            <Input
                                                autoFocus
                                                placeholder="Title"
                                                type="text"
                                                value={formValues.title}
                                                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                                            />
                                            {notValid.error && notValid.type === 'title' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label for="exampleSelect"><span className="text-danger" >*</span>  Categories</Label>
                                            <Input type="select"
                                                name="select"
                                                id="exampleSelect"
                                                value={formValues.categoryId}
                                                onChange={(e) => setFormValues({ ...formValues, categoryId: Number(e.target.value) })}

                                            >
                                                <option value={''} >Select Category</option>
                                                {
                                                    categories.map((v, i) => {
                                                        return (<option key={i} value={v.id} >{v.title}</option>);

                                                    })
                                                }

                                            </Input>
                                            {notValid.error && notValid.type === 'categoryId' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className="text-danger" >*</span> Description <b><i> Write 25 - 250 Characters </i></b></Label>
                                            <Input
                                                placeholder="Service Description ( Write 25 - 250 Characters )"
                                                type="textarea"
                                                value={formValues.description}
                                                style={{ height: '10rem' }}
                                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                            />
                                            {notValid.error && notValid.type === 'description' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className="text-danger" >*</span> Short Description <b><i> Write 15-25 Characters</i> </b> </Label>
                                            <Input
                                                placeholder="Service Description ( Write 15 - 25 Characters ) "
                                                type="text"
                                                value={formValues.shortDescription}
                                                onChange={(e) => setFormValues({ ...formValues, shortDescription: e.target.value })}
                                            />
                                            {notValid.error && notValid.type === 'shortDescription' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className="text-danger" >*</span> Min Order Qty </Label>
                                            <Input
                                                placeholder="Minimum QTY for order "
                                                type="number"
                                                value={formValues.minQty}
                                                onChange={(e) => setFormValues({ ...formValues, minQty: e.target.value })}
                                            />
                                            {notValid.error && notValid.type === 'minQty' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className="text-danger" >*</span> $Price </Label>
                                            <Input
                                                placeholder="0.00"
                                                type="number"
                                                value={formValues.price}
                                                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                                            />
                                            {notValid.error && notValid.type === 'price' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="service-image" >Upload image with minimum dimension of 512 x 512 not exceeding 4MB</Label>
                                            <Input
                                                id="service-image"
                                                type="file"
                                                name="file"
                                                accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                                                onChange={onImageSelect}
                                            />
                                            {imageNotValid.error &&
                                                <label className=" ml-1 text-danger" >{imageNotValid.message}</label>
                                            }
                                            {/* {notValid.error && notValid.type === 'image' &&
                                                <label className=" ml-1 text-danger" >{notValid.message}</label>
                                            } */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {formValues.image && <Row  >
                                    {!formValues.removeImage && <Col sm="2"  >
                                        <button className="close mr-3" onClick={() => setFormValues({ ...formValues, removeImage: true })} >&times;</button>
                                        <img src={`${API_URL}/${formValues.image}`} alt={'img'} className="img-thumbnail table-image" />
                                    </Col>}
                                </Row>}
                                <Row className=" " >
                                    <Col sm="6" >
                                        <span className="text-danger" >*</span><span> Required fields</span>
                                    </Col>
                                </Row>
                                <Col sm="6" className="pl-0" >
                                    <Button type={'submit'} disabled={isProgress} className="btn-round btn-primary btn-add-modal" >
                                        {
                                            isProgress
                                                ?
                                                <div className="spinner" ></div>
                                                :
                                                ' Update'}
                                    </Button>
                                    <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                </Col>
                                <Row>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

EditSerivce.propTypes = {
    history: PropTypes.object
};
export default EditSerivce;
