import React, { memo, useEffect, useState, useCallback } from 'react';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { OrderStatus } from '../../store/constants/OrderConstants';
import { DriverActions } from '../../store/actions/DriverActions';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../store/actions/OrderActions';
import { OrderStatusArray } from '../../store/constants/OrderConstants';

const StatusChangeConfModal = memo(({ isOpen, toggle, isProgress, newStatus, prevStatus }) => {
    const [selectedDriver, setSelectedDriver] = useState(0);

    const drivers = useSelector(store => store?.driver?.drivers);
    const orderId = useSelector(store => store?.order?.order?.id);
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const dispatch = useDispatch();

    const updateStatus = useCallback(() => {
        let _selectedDriver = Number(selectedDriver);
        if (newStatus === OrderStatus.Cancelled) {
            dispatch(OrderActions.cancelOrder(orderId));
        }
        else {
            if (notValid.error) {
                setNotValid({ error: false, type: '', message: '' });
            }
            if (newStatus === OrderStatus.PickUp || newStatus === OrderStatus.DropOff) {
                if (_selectedDriver === 0) {
                    setNotValid({ error: true, type: 'driverId', message: 'Please select driver' });
                    return;
                }
            }
            let body = {
                orderId,
                status: newStatus,
                driverId: _selectedDriver > 0 ? _selectedDriver : undefined
            };
            dispatch(OrderActions.updateOrderStatus(body));
        }
    }, [orderId, newStatus, selectedDriver, dispatch, notValid]);

    useEffect(() => {
        if (isOpen) {
            if (newStatus === OrderStatus.PickUp || newStatus === OrderStatus.DropOff) {
                dispatch(DriverActions.getDrivers(1, 1000));
            }
        }
        else {
            setSelectedDriver(0);
        }
    }, [isOpen, dispatch, newStatus]);
    return (
        <Modal centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader >Status Update</ModalHeader>
            {newStatus === OrderStatus.PickUp || newStatus === OrderStatus.DropOff
                ?
                < ModalBody className="d-flex flex-column" >
                    <span>{'Do you really want to change the order status from '}
                        < b > {OrderStatusArray[prevStatus]}</b> to < b > {OrderStatusArray[newStatus]}</b >?</span>

                    <FormGroup className="col-md-12" >
                        <Label for="exampleSelect"><span className="text-danger" >*</span>Please select Driver </Label>
                        <Input type="select" value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} name="select" id="exampleSelect">
                            <option value={0} >{'Select Driver'}</option>
                            {
                                drivers.map((v, i) => {
                                    return (<option key={i} value={v?.id} >{v.name}</option>);
                                })
                            }
                        </Input>
                        {notValid.error && notValid.type === 'driverId' &&
                            <label className=" ml-3 text-danger" >{notValid.message}</label>
                        }
                    </FormGroup>
                </ModalBody >
                :
                <ModalBody>{'Do you really want to change the order status from '}
                    <b> {OrderStatusArray[prevStatus]}</b> to <b> {OrderStatusArray[newStatus]}</b>?
                </ModalBody>
            }
            <ModalFooter className="p-0 pr-2"  >
                <Button color="danger" className="btn-round btn-add-modal" onClick={updateStatus}>
                    {
                        isProgress ?
                            <div className="spinner spinner-danger" ></div>
                            :
                            <span> Yes </span>
                    }
                </Button>
                <Button color="secondary" className="btn-round btn-cancel-modal" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal >
    );

});
StatusChangeConfModal.displayName = 'StatusChangeConfModal';
StatusChangeConfModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    isProgress: PropTypes.bool,
    newStatus: PropTypes.string,
    prevStatus: PropTypes.string,

};
export default StatusChangeConfModal;