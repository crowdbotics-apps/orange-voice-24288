import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryActions } from '../../store/actions/CategoryActions';

const AddCategoryModal = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [imageNotValid, setImageNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.category?.isProgress);
    const isOpen = useSelector(store => store?.category?.openAddModal);
    const dispatch = useDispatch();


    const toggle = useCallback(() => {
        dispatch(CategoryActions.toggleAddCategoryModal());
    }, [dispatch]);


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
            setFile(file);
            img.src = objectUrl;
        } else {
            setImageNotValid({ error: false, message: '' });
            setFile(file);
        }
    }, [imageNotValid]);


    const addCategory = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!title) {
            setNotValid({ error: true, type: 'title', message: 'Please provide title' });
            return;
        }
        if (title.length > 50) {
            setNotValid({ error: true, type: 'title', message: 'Title exceed 50 characters' });
            return;
        }
        else if (file && imageNotValid.error) {
            return;
        }
        let formData = new FormData();
        formData.append('title', title);
        formData.append('imageFile', file);
        dispatch(CategoryActions.addCategory(formData));
    }, [dispatch, title, file, imageNotValid, notValid]);


    useEffect(() => {
        setTitle('');
        setFile('');
        setNotValid({ error: false, type: '', message: '' });
        setImageNotValid({ error: false, message: '' });
    }, [isOpen]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal backdrop={'static'} centered={true} autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Category</ModalHeader>
            <Form onSubmit={addCategory} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Title <b><i> (Max 50 characters)</i></b> </label>
                                <Input autoFocus placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>
                            {notValid.error && notValid.type === 'title' &&
                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Upload image with minimum dimension of 512 x 512 not exceeding 4MB</label>
                                <Input
                                    type="file"
                                    placeholder="Image"
                                    accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                                    onChange={onImageSelect}
                                />
                                {imageNotValid.error &&
                                    <label className=" ml-1 text-danger" >{imageNotValid.message}</label>
                                }

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className=" " >
                        <Col sm="6" className="py-0"  >
                            <span className="text-danger" >*</span><span> Required fields</span>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type={'submit'} disabled={isProgress} className="btn-round btn-add-modal" >
                        {
                            isProgress ?
                                <div className="spinner" ></div>
                                :
                                <span> Add </span>
                        }
                    </Button>
                    <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

};
AddCategoryModal.displayName = 'AddCategoryModal';
AddCategoryModal.propTypes = {
};
export default AddCategoryModal;