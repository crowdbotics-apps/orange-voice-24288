import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LocationActions } from '../../store/actions/LocationActions';

const AddLocationModal = () => {
    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.location?.isProgress);
    const isOpen = useSelector(store => store?.location?.openAddModal);
    const dispatch = useDispatch();


    const toggle = useCallback(() => {
        dispatch(LocationActions.toggleAddLocationModal());
    }, [dispatch]);


    const addLocation = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!name) {
            setNotValid({ error: true, type: 'name', message: 'Please provide name' });
            return;
        }
        if (name.length > 50) {
            setNotValid({ error: true, type: 'name', message: 'name exceed 50 characters' });
            return;
        }
        if (!postalCode) {
            setNotValid({ error: true, type: 'postalCode', message: 'Please provide postal code' });
            return;
        }
        if (postalCode.length !== 3) {
            setNotValid({ error: true, type: 'postalCode', message: 'Postal Code not 3 characters' });
            return;
        }

        let body = {
            name,
            postalCode,
        };
        dispatch(LocationActions.addLocation(body));
    }, [dispatch, name, postalCode, notValid]);


    useEffect(() => {
        setName('');
        setPostalCode('');
        setNotValid({ error: false, type: '', message: '' });
    }, [isOpen]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal backdrop={'static'} centered={true} autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Location</ModalHeader>
            <Form onSubmit={addLocation} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Name <b><i> (Max 50 characters)</i></b> </label>
                                <Input autoFocus placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </FormGroup>
                            {notValid.error && notValid.type === 'name' &&
                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> postal Code <b><i> (3 characters)</i></b> </label>
                                <Input placeholder="PostalCode" type="text"  maxLength={3} value={postalCode} onChange={(e) => setPostalCode(String(e.target.value).toUpperCase())} />
                            </FormGroup>
                            {notValid.error && notValid.type === 'postalCode' &&
                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                            }
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
AddLocationModal.displayName = 'AddLocationModal';
AddLocationModal.propTypes = {
};
export default AddLocationModal;