import React, { memo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const AddDriverModal = memo(({ isOpen, toggle }) => {
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Driver</ModalHeader>
            <ModalBody>
                <Form>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>
                                    Name
                          </label>
                                <Input autoFocus placeholder="Name" type="name" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>
                                    Email address
                          </label>
                                <Input placeholder="Email" type="email" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>Contact Number</label>
                                <Input
                                    placeholder="Contact Number"
                                    type="number"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label>License Number <i>Driver will Use This Number To Login At App</i> </label>
                                <Input
                                    placeholder="License Number"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary"  className="btn-round btn-add-modal" onClick={toggle}>Add</Button>{' '}
                <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

});
AddDriverModal.displayName = 'AddDriverModal';
AddDriverModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};
export default AddDriverModal;