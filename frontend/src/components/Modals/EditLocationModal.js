import React, { useCallback, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LocationActions } from '../../store/actions/LocationActions';

const EditLocationModal = () => {
    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const isProgress = useSelector(store => store?.location?.isProgress);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const isOpen = useSelector(store => store?.location?.openEditModal);
    const location = useSelector(store => store?.location?.location);
    const dispatch = useDispatch();


    const toggle = useCallback(() => {
        dispatch(LocationActions.toggleEditLocationModal());
    }, [dispatch]);


    useEffect(() => {
        if (location) {
            setName(location.name);
            setPostalCode(location.postalCode);
        }
    }, [location]);


    useEffect(() => {
        setNotValid({ error: false, type: '', message: '' });

    }, [isOpen]);

    const onEditClick = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!name) {
            setNotValid({ error: true, type: 'name', message: 'Please provide name' });
            return;
        }
        if (name.length > 50) {
            setNotValid({ error: true, type: 'name', message: 'Name exceed 50 characters' });
            return;
        }
        if (!postalCode) {
            setNotValid({ error: true, type: 'postalCode', message: 'Please provide name' });
            return;
        }
        if (postalCode.length !== 3) {
            setNotValid({ error: true, type: 'postalCode', message: 'Postal Code not 3 characters' });
            return;
        }
        let body = {
            id: location.id,
            name,
            postalCode
        };
        dispatch(LocationActions.editLocation(body));

    }, [dispatch, location, name, postalCode, notValid]);


    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} backdrop={'static'} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Update Location</ModalHeader>
            <Form onSubmit={onEditClick} >
                <ModalBody>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Name <b><i> (Max 50 characters)</i></b></label>
                                <Input autoFocus placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                {notValid.error && notValid.type === 'name' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label><span className="text-danger" >*</span> Postal Code <b><i> (3 characters)</i></b></label>
                                <Input placeholder="PostalCode" type="text" maxLength={3} value={postalCode} onChange={(e) => setPostalCode(String(e.target.value).toUpperCase())} />
                                {notValid.error && notValid.type === 'postalCode' &&
                                    <label className=" ml-3 text-danger" >{notValid.message}</label>
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
                    <Button color="primary" type={'submit'} className="btn-round btn-add-modal">
                        {
                            isProgress ?
                                <div className="spinner" ></div>
                                :
                                <span> Update </span>
                        }
                    </Button>{' '}
                    <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );

};
EditLocationModal.displayName = 'EditLocationModal';
EditLocationModal.propTypes = {
};
export default EditLocationModal;