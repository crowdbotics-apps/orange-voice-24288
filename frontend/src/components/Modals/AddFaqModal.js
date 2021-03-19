import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaqActions } from '../../store/actions/FaqActions';
import { ServiceActions } from '../../store/actions/ServiceActions';


const AddFaqModal = () => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ question: '', answer: '', serviceId: '' });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.faq?.isProgress);
    const services = useSelector(store => store?.service?.services);
    const isOpen = useSelector(store => store?.faq?.openAddModal);


    useEffect(() => {
        dispatch(ServiceActions.getServices(1, 1000));
    }, [dispatch]);


    useEffect(() => {
        setFormValues({ question: '', answer: '', serviceId: '' });
        setNotValid({ error: false, type: '', message: '' });
    }, [isOpen]);


    const toggle = useCallback(() => {
        dispatch(FaqActions.toggleAddFaqModal());
    }, [dispatch]);


    const addFaq = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        // if (formValues.serviceId === '') {
        //     setNotValid({ error: true, type: 'serviceId', message: 'Please select service' });
        //     return;
        // }
        else if (!formValues.question) {
            setNotValid({ error: true, type: 'question', message: 'Please provide question' });
            return;
        }
        else if (formValues.question.length < 3) {
            setNotValid({ error: true, type: 'question', message: 'Question is too short' });
            return;
        }
        else if (formValues.question.length > 100) {
            setNotValid({ error: true, type: 'question', message: 'Question character length should not exceed 100' });
            return;
        }
        else if (!formValues.answer) {
            setNotValid({ error: true, type: 'answer', message: 'Please provide descritpion' });
            return;
        }
        else if (formValues.answer.length < 10) {
            setNotValid({ error: true, type: 'answer', message: 'Description is too short' });
            return;
        }
        else if (formValues.answer.length > 250) {
            setNotValid({ error: true, type: 'answer', message: 'Description character length should not exceed 250' });
            return;
        }
        let body = {
            question: formValues.question,
            answer: formValues.answer,
            serviceId: Number(formValues.serviceId)
        };
        dispatch(FaqActions.addFaq(body));

    }, [formValues, dispatch, notValid]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add FAQ</ModalHeader>
            <Form onSubmit={addFaq} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <Label for="exampleSelect"> Services</Label>
                                <Input
                                    autoFocus
                                    type="select"
                                    name="select"
                                    value={formValues.serviceId}
                                    onChange={(e) => setFormValues({ ...formValues, serviceId: e.target.value })}
                                    id="exampleSelect">
                                    <option value={''} >Select Service</option>
                                    {
                                        services.map((v, i) => {
                                            return (<option key={i} value={v.id} >{v.title}</option>);

                                        })
                                    }
                                </Input>
                                {notValid.error && notValid.type === 'serviceId' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Question </label>
                                <Input
                                    placeholder="Question"
                                    type="text"
                                    value={formValues.question}
                                    onChange={(e) => setFormValues({ ...formValues, question: e.target.value })}
                                />
                                {notValid.error && notValid.type === 'question' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <Label for="description"><span className="text-danger" >*</span> Description </Label>
                                <Input
                                    id="description"
                                    type="textarea"
                                    name="text"
                                    placeholder="Description"
                                    value={formValues.answer}
                                    onChange={(e) => setFormValues({ ...formValues, answer: e.target.value })}
                                />
                                {notValid.error && notValid.type === 'answer' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className=" " >
                        <Col sm="6" >
                            <span className="text-danger" >*</span><span> Required fields</span>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-round btn-add-modal"
                        type={'submit'}
                    >
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
AddFaqModal.displayName = 'AddFaqModal';
AddFaqModal.propTypes = {
};
export default AddFaqModal;