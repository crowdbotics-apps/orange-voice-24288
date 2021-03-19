import React, { memo, useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Container, Card, CardHeader, CardBody, Input } from 'reactstrap';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { OrderActions } from '../../store/actions/OrderActions';
import { OrderStatus, OrderStatusArray } from '../../store/constants/OrderConstants';

const EditOrderDetailModal = memo(({ isOpen, toggle }) => {
    const dispatch = useDispatch();
    const order = useSelector(store => store?.order?.order);
    const isProgress = useSelector(store => store?.order?.isProgressEdit);
    const [listDetail, setListDetail] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalHST, setTotalHST] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    useEffect(() => {
        if (order) {
            let array = order?.listDetail?.map((v) => {
                let obj = v;
                obj['id'] = undefined;
                return (
                    obj
                );
            });
            // setListDetail(order?.listDetail);
            setListDetail(array);
            setDiscountAmount(order?.discountAmount);
        }
    }, [order]);

    const updateQty = useCallback((index, qty) => {
        let array = [...listDetail];
        let detail = array[index];
        detail['quantity'] = Number(qty);
        array[index] = { ...detail };
        setListDetail(array);
    }, [listDetail]);

    const updateUnitPrice = useCallback((index, price) => {
        let array = [...listDetail];
        let detail = array[index];
        detail['unitPrice'] = Number(price);
        array[index] = { ...detail };
        setListDetail(array);
    }, [listDetail]);

    const updateOrder = useCallback((e) => {
        e.preventDefault();
        let {
            id,
            orderDate,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            addressId,
            deliveryAddress,
            description,
            taxPercentage,
            couponId,
            couponCode,
            couponType

        } = order;
        let body = {
            id,
            orderDate,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            addressId,
            deliveryAddress,
            description,
            taxPercentage,
            couponId,
            couponCode,
            couponType,
            orderAmount: Number(totalAmount),
            discountAmount: Number(discountAmount),
            totalAmount: Number(grandTotal),
            listDetail: listDetail,
        };
        dispatch(OrderActions.editOrder(body));
    }, [order, listDetail, dispatch, discountAmount, grandTotal, totalAmount]);

    const calculateTotal = useCallback((accumulator, item) => {
        let price = item.unitPrice;
        let qty = item.quantity;
        let amount = price * qty;
        return accumulator + amount;
    }, []);

    const calculateDiscount = useCallback((totalAmount, discountAmount) => {
        let _totalAmount = totalAmount - discountAmount;
        return _totalAmount;
    }, []);

    const calculateAmount = useCallback(() => {
        let amount = listDetail.reduce(calculateTotal, 0);
        amount = Number(amount).toFixed(2);
        setTotalAmount(amount);
    }, [listDetail, calculateTotal,]);

    const calculateHST = useCallback((totalAmount) => {
        let hst = Number(totalAmount * (order?.taxPercentage / 100)).toFixed(2);
        setTotalHST(hst);
        return hst;
    }, [order]);

    const calculateGrandTotal = useCallback(() => {
        let _totalAmount = Number(totalAmount);
        if (discountAmount > 0) {
            _totalAmount = calculateDiscount(_totalAmount, discountAmount);
        }
        let hst = calculateHST(_totalAmount);
        let grandTotal = Number(_totalAmount) + Number(hst);
        grandTotal = Number(grandTotal).toFixed(2);
        setGrandTotal(grandTotal);
    }, [totalAmount, discountAmount, calculateDiscount, calculateHST]);

    useEffect(() => {
        calculateAmount();
        calculateHST();
        calculateGrandTotal();
    }, [listDetail, calculateAmount, discountAmount, calculateGrandTotal, calculateHST]);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal isOpen={isOpen} centered={true} toggle={toggle} size={'lg'}>
            <ModalHeader toggle={toggle} close={closeBtn}>Order Detail</ModalHeader>
            <form onSubmit={updateOrder} >
                <ModalBody>
                    <Container>
                        <Row className="mb-4">
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column">
                                            <span className="font-weight-bold">Customer Details:</span>
                                            <span>{order?.firstName} {order?.lastName}</span>
                                            <span>{order?.email}</span>
                                            <span>{order?.phoneNo}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column">
                                            <span className="font-weight-bold">Status:</span>
                                            <span>{OrderStatusArray[order?.status]}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column">
                                            <span className="font-weight-bold">Address:</span>
                                            <span>{order?.address?.mainAddress},{order?.address?.postalCode}</span>
                                            <span>{order?.address?.phone}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column align-items-end">
                                            <span className="font-weight-bold">Order Ref:</span>
                                            <span>{order?.orderNumber}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column align-items-end">
                                            <span className="font-weight-bold">Order Date:</span>
                                            <span>{moment(new Date(order?.orderDate)).format('DD-MM-YYYY')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column align-items-end">
                                            <span className="font-weight-bold">Pickup:</span>
                                            <span>{order?.pickupTime} {moment(new Date(order?.pickupDate)).format('DD-MM-YYYY')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <div className="d-flex flex-column align-items-end">
                                            <span className="font-weight-bold">Drop Off:</span>
                                            <span>{order?.dropoffTime} {moment(new Date(order?.dropoffDate)).format('DD-MM-YYYY')}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Card>
                                <CardHeader className="d-flex flex-column bg-light">
                                    <h6>Detail</h6>
                                </CardHeader>
                                <CardBody>
                                    <Row className="d-flex font-weight-bold border-order-modal-light">
                                        <Col md={3}>
                                            Service
                                    </Col>
                                        <Col md={3}>
                                            QTY
                                    </Col>
                                        <Col md={3}>
                                            Unit Price
                                    </Col>
                                        <Col md={3} className="text-right">
                                            Totals
                                    </Col>
                                    </Row>
                                    {listDetail?.map((detail, index) => {

                                        return (<Row key={index} className="d-flex py-2 border-bottom border-dark">
                                            <Col md={3}>
                                                {detail?.service?.title}
                                            </Col>
                                            <Col md={3}>
                                                <Input value={detail?.quantity} min={1} type="number" onChange={(e) => updateQty(index, e.target.value)} />
                                            </Col>
                                            <Col md={3}>
                                                <Input value={detail?.unitPrice} min={1} type="number" onChange={(e) => updateUnitPrice(index, e.target.value)} />
                                            </Col>
                                            <Col md={3} className="text-right">
                                                ${detail?.quantity * detail?.unitPrice}
                                            </Col>
                                        </Row>);
                                    })
                                    }
                                    <Row className="d-flex justify-content-end py-2">
                                        <Col md={2} className="font-weight-bold">
                                            Total:
                                    </Col>
                                        <Col md={2} className="text-right">
                                            ${totalAmount}
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end py-2">
                                        <Col md={2} className="font-weight-bold">
                                            Discount:
                                    </Col>
                                        <Col md={2} className="text-right">
                                            ${discountAmount}
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end py-2">
                                        <Col md={2} className="font-weight-bold">
                                            HST {order?.taxPercentage}%:
                                    </Col>
                                        <Col md={2} className="text-right">
                                            ${totalHST}
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end py-2">
                                        <Col md={2} className="font-weight-bold">
                                            Grand Total:
                                    </Col>
                                        <Col md={2} className="text-right">
                                            ${grandTotal}
                                        </Col>
                                    </Row>
                                    <Row className="d-flex my-4">
                                        <Col md={2}>
                                            Discount
                                    </Col>
                                        <Col md={2}>
                                            <Input value={discountAmount} min={0} type="number" onChange={(e) => setDiscountAmount(e.target.value)} />
                                        </Col>
                                        {/* <Col md={2}>
                                        <Input type="select" id={'discount-unit'}   name="select" >
                                           
                                            <option value={'Tomorrow'} >%</option>
                                            <option value={'This Week'} >$</option>
                                        </Input>
                                    </Col> */}
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn-round" type={'submit'} disabled={order?.status === OrderStatus.Cancelled} >
                        {
                            isProgress ?
                                <div className="spinner" ></div>
                                :
                                <span> Update </span>
                        }
                    </Button>
                    <Button color="secondary" className="btn-round" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </form>
        </Modal>
    );
});
EditOrderDetailModal.displayName = 'EditOrderDetailmodal';
EditOrderDetailModal.propTypes = {
    isOpen: propTypes.bool,
    toggle: propTypes.func
};
export default EditOrderDetailModal;