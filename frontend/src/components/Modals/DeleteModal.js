import React, { memo } from 'react';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const DeleteModal = memo(({ isOpen, toggle, delFunc, isProgress }) => {
    return (
        <Modal centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader >Confirm Delete</ModalHeader>
            <ModalBody>Do you really want to delete this?</ModalBody>
            <ModalFooter className="p-0 pr-2"  >
                <Button color="danger" className="btn-round btn-add-modal" onClick={delFunc}>
                    {
                        isProgress ?
                            <div className="spinner spinner-danger" ></div>
                            :
                            <span> Yes </span>
                    }
                </Button>
                <Button color="secondary" className="btn-round btn-cancel-modal" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

});
DeleteModal.displayName = 'DeleteModal';
DeleteModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    delFunc: PropTypes.func,
    isProgress: PropTypes.bool
};
export default DeleteModal;