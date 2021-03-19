import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Input,
    // Form,
    FormGroup,
    Label,
    Table
} from 'reactstrap';
import Pin from '../../../assets/img/pin.svg';
import Plus from '../../../assets/img/plus.svg';
import Minus from '../../../assets/img/minus.svg';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../../store/actions/OrderActions';
import { CategoryActions } from '../../../store/actions/CategoryActions';
import { ServiceActions } from '../../../store/actions/ServiceActions';
export default function CreateCustomerOrder({ history }) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        pickupDate: '',
        pickupTime: '',
        dropoffDate: '',
        dropoffTime: '',
        driverInstruction: ''
    });
    const [categoryId, setCategoryId] = useState(0);
    const [selectedService, setSelectedService] = useState({ id: 0, index: -1 });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const [pickupTime, setPickupTime] = useState([]);
    const [dropoffTime, setDropoffTime] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(undefined);
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalHST, setTotalHST] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);


    const addresses = useSelector(store => store?.order?.addresses);
    const timeSlots = useSelector(store => store?.order?.config?.timeSlots);
    const dropOfThreshold = useSelector(store => store?.order?.config?.system.DropOfThreshold);
    const categories = useSelector(store => store?.category?.categories);
    const services = useSelector(store => store?.service?.servicesByCategory);
    const isProgressServices = useSelector(store => store?.service?.isProgress);
    const HSTPercentage = useSelector(store => store?.order?.config?.system?.HSTPercentage);
    const isProgress = useSelector(store => store?.order?.isProgressPost);
    const isProgressPickupSlot = useSelector(store => store?.order?.isProgressPickupSlot);
    const isProgressDropoffSlot = useSelector(store => store?.order?.isProgressDropoffSlot);
    const isDropoffSlotAvailable = useSelector(store => store?.order?.isDropoffSlotAvailable);
    const isPickupSlotAvailable = useSelector(store => store?.order?.isPickupSlotAvailable);
    const isErrorPickupSlot = useSelector(store => store?.order?.isErrorPickupSlot);
    const isErrorDropoffSlot = useSelector(store => store?.order?.isErrorDropoffSlot);
    const errorMessage = useSelector(store => store?.order?.errorText);

    useEffect(() => {
        dispatch(OrderActions.getAddresses(id));
        dispatch(OrderActions.getLov());
        dispatch(CategoryActions.getCategories(1, 1000));
    }, [id, dispatch]);

    const isSunday = date => {
        const day = new Date(date).getDay();
        return day !== 0;
    };

    const availableDropOffTime = useCallback((selectedPickupTimeIndex) => {
        let _dropoffTime = [...timeSlots];
        _dropoffTime = _dropoffTime.slice(selectedPickupTimeIndex - 1);
        setDropoffTime(_dropoffTime);

    }, [timeSlots]);

    useEffect(() => {
        if (timeSlots.length) {
            setPickupTime(timeSlots);
            setDropoffTime(timeSlots);
        }
    }, [timeSlots]);

    const getPrimaryAddressLatLng = useCallback(() => {
        if (addresses.length) {
            let selectedAddress = addresses.find((v) => v.isPrimary);
            setSelectedAddress(selectedAddress);
        }
    }, [addresses]);

    const addItem = useCallback(() => {
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (Number(categoryId) === 0) {
            setNotValid({ error: true, type: 'categoryId', message: 'Please select category' });
            return;
        }
        if (Number(selectedService?.id) === 0) {
            setNotValid({ error: true, type: 'serviceId', message: 'Please select service' });
            return;
        }
        let item = services[selectedService?.index];
        let _items = [...items];
        let obj = {
            serviceId: item.id,
            minQty: item.minQty,
            quantity: item.minQty,
            unitPrice: item.price,
            amount: item.price * item.minQty,
            title: item?.title
        };
        _items.push(obj);
        setCategoryId(0);
        setSelectedService({ id: 0, index: -1 });
        setItems(_items);
    }, [items, services, selectedService, notValid, categoryId]);

    useEffect(() => {
        getPrimaryAddressLatLng();
    }, [addresses, getPrimaryAddressLatLng]);

    useEffect(() => {
        if (categoryId) {
            dispatch(ServiceActions.getServicesByCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    useEffect(() => {
        if (formValues.pickupTime && formValues.pickupDate) {
            let body = {
                date: moment(formValues.pickupDate).format('YYYY-MM-DD'),
                time: formValues.pickupTime,
                status: 'PickUp'// PickUp, DropOff
            };
            dispatch(OrderActions.checkSelectedPickupSlot(body));
        }

        return () => {
            dispatch(OrderActions.clearError());
        };

    }, [formValues.pickupTime, formValues.pickupDate, dispatch]);


    useEffect(() => {
        if (formValues.dropoffTime && formValues.dropoffDate) {
            let body = {
                date: moment(formValues.dropoffDate).format('YYYY-MM-DD'),
                time: formValues.dropoffTime,
                status: 'DropOff'// PickUp, DropOff
            };
            dispatch(OrderActions.checkSelectedDropoffSlot(body));
        }


    }, [formValues.dropoffTime, formValues.dropoffDate, dispatch]);

    const incrementQty = useCallback((index) => {
        let _items = [...items];
        let _item = _items[index];
        _item.quantity++;
        _item.amount = _item.quantity * _item.unitPrice;
        _items[index] = _item;
        setItems(_items);
    }, [items]);

    const decrementQty = useCallback((index) => {
        if (items[index].quantity > items[index].minQty) {
            let _items = [...items];
            let _item = _items[index];
            _item.quantity--;
            _item.amount = _item.quantity * _item.unitPrice;
            _items[index] = _item;
            setItems(_items);
        }

    }, [items]);

    const removeFromBasket = useCallback((index) => {
        let _items = [...items];
        _items.splice(index, 1);
        setItems(_items);
    }, [items]);

    const calculateTotal = useCallback((accumulator, item) => {
        let price = item.unitPrice;
        let qty = item.quantity;
        let amount = price * qty;
        return accumulator + amount;
    }, []);


    const calculateAmount = useCallback(() => {
        let amount = items.reduce(calculateTotal, 0);
        amount = Number(amount).toFixed(2);
        setTotalAmount(amount);
    }, [items, calculateTotal,]);

    const calculateHST = useCallback((totalAmount) => {
        let hst = Number(totalAmount * (HSTPercentage / 100)).toFixed(2);
        setTotalHST(hst);
        return hst;
    }, [HSTPercentage]);

    const calculateGrandTotal = useCallback(() => {
        let _totalAmount = Number(totalAmount);
        let hst = calculateHST(_totalAmount);
        let grandTotal = Number(_totalAmount) + Number(hst);
        grandTotal = Number(grandTotal).toFixed(2);
        setGrandTotal(grandTotal);
    }, [totalAmount, calculateHST]);

    useEffect(() => {
        calculateAmount();
        calculateHST();
        calculateGrandTotal();
    }, [items, calculateAmount, calculateGrandTotal, calculateHST]);

    const postOrder = useCallback(() => {
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (items.length === 0) {
            setNotValid({ error: true, type: 'items', message: 'Please add items to list' });
            return;
        }
        if (!formValues.pickupDate) {
            setNotValid({ error: true, type: 'pickupDate', message: 'Please select pickup date' });
            return;
        }
        if (!formValues.pickupTime) {
            setNotValid({ error: true, type: 'pickupTime', message: 'Please select pickup time' });
            return;
        }
        if (!formValues.dropoffDate) {
            setNotValid({ error: true, type: 'dropoffDate', message: 'Please select dropoff date' });
            return;
        }
        if (!formValues.dropoffTime) {
            setNotValid({ error: true, type: 'dropoffTime', message: 'Please select dropoff time' });
            return;
        }
        if (!formValues.dropoffTime) {
            setNotValid({ error: true, type: 'dropoffTime', message: 'Please select dropoff time' });
            return;
        }
        if (!selectedAddress) {
            setNotValid({ error: true, type: 'address', message: 'Please select address' });
            return;
        }
        let body = {
            userId: Number(id),
            orderDate: moment(new Date()).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            pickupDate: moment(formValues.pickupDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            pickupTime: formValues.pickupTime,
            dropoffDate: moment(formValues.dropoffDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            dropoffTime: formValues.dropoffTime,
            addressId: selectedAddress?.id,
            deliveryAddress: selectedAddress?.mainAddress,
            description: formValues.driverInstruction,
            taxPercentage: Number(HSTPercentage),
            orderAmount: Number(totalAmount),
            discountAmount: Number(0),
            totalAmount: Number(grandTotal),
            listDetail: items.map((v) => ({
                serviceId: v.serviceId,
                quantity: v.quantity,
                unitPrice: v.unitPrice,
                amount: v.unitPrice * v.quantity,
            })),
        };

        dispatch(OrderActions.postOrder(body));

    }, [totalAmount, grandTotal, dispatch, formValues, selectedAddress, HSTPercentage, items, id, notValid]);

    const today = 24;
    const dropoffStartHours = Number(dropOfThreshold) + today;
    const dropoffStartDays = Math.ceil(dropoffStartHours / 24);
    const allowedDaysThreshold = 7;
    const pickupMinDate = moment(new Date()).add(today, 'hours').toDate();
    const pickupMaxDate = moment(new Date(), 'DD-MM-YYYY').add(allowedDaysThreshold, 'days').toDate();
    const dropOffMinDate = moment(formValues.pickupDate, 'DD-MM-YYYY').add(dropoffStartHours, 'hours').toDate();
    const dropOffMaxDate = moment(formValues.pickupDate, 'DD-MM-YYYY').add(allowedDaysThreshold + dropoffStartDays, 'days').toDate();

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Create Order</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6} className="border-right" >
                                    <Row>
                                        <Col sm="5">
                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >*</span> Categories</Label>
                                                <Input type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                    value={categoryId}
                                                    onChange={(e) => setCategoryId(Number(e.target.value))} >
                                                    <option value={0} >Select Category</option>
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
                                        <Col sm="5">
                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >*</span> Services</Label>
                                                <Input disabled={Number(categoryId) === 0} type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                    value={selectedService?.id}
                                                    onChange={(e) => setSelectedService({ id: e.target.value, index: e.target.selectedIndex - 1 })}

                                                >
                                                    <option value={0} >Select Service</option>
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
                                        <Col sm="2">
                                            <FormGroup className="mt-2" >

                                                <Button color="primary" type={'button'} disabled={isProgressServices} onClick={addItem} className="btn-round btn-add mt-3">
                                                    {isProgressServices
                                                        ?
                                                        <div className="spinner" ></div>
                                                        : <i className="fas fa-plus"></i>
                                                    }
                                                </Button>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: '10rem', overflowY: 'auto' }} >
                                        <Col md={12} >
                                            <Table  >
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Products</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>SubTotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, index) => {
                                                        return (

                                                            < tr key={index} >
                                                                <td>
                                                                    <h6  >
                                                                        <i className="font-weight-bold fa fa-times cursor-pointer" onClick={() => removeFromBasket(index)} ></i>
                                                                    </h6>
                                                                </td>
                                                                <td>{item?.title}</td>
                                                                <td>${item?.unitPrice} </td>
                                                                <td>
                                                                    <div className=" quantity d-flex  align-items-center" >

                                                                        <img className="mr-3 cursor-pointer " alt="img" onClick={() => incrementQty(index)} src={Plus} />

                                                                        <span className="">{item?.quantity}</span>

                                                                        <img className="ml-3 cursor-pointer " alt="img" onClick={() => decrementQty(index)} src={Minus} />

                                                                    </div></td>
                                                                <td>${item?.amount} </td>
                                                            </tr>
                                                        );
                                                    })
                                                    }


                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    {notValid.error && notValid.type === 'items' &&
                                        <label className=" ml-3 text-danger" >{notValid.message}</label>
                                    }
                                    <div className="d-flex align-items-center w-100 ">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >Total</span>
                                        <span className="font-weight-bold ml-5 w-25" >${totalAmount}  </span>

                                    </div>
                                    <div className="d-flex align-items-center  w-100">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >HST {HSTPercentage}% </span>
                                        <span className="font-weight-bold ml-5 w-25" > ${totalHST} </span>

                                    </div>
                                    <div className="d-flex align-items-center  w-100">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >Grand Total</span>
                                        <span className="font-weight-bold ml-5 w-25" >${grandTotal}  </span>

                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label className="d-flex" ><span className="text-danger" >* </span>Pickup Date
                                                {isProgressPickupSlot && <div className="spinner " ></div>}
                                                </Label>
                                                <ReactDatePicker
                                                    selected={formValues.pickupDate}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, pickupDate: e, dropoffDate: '' });

                                                    }}
                                                    className="form-control react-date-picker-custom"
                                                    placeholderText={'mm/dd/yyyy'}
                                                    minDate={pickupMinDate}
                                                    maxDate={pickupMaxDate}
                                                    filterDate={isSunday}
                                                />
                                                {(notValid.error && notValid.type === 'pickupDate') && <label className="text-danger" > {notValid.message} </label>}

                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >* </span>Pickup Time</Label>
                                                <Input type="select" name="select" value={formValues.pickupTime}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, pickupTime: e.target.value, dropoffTime: '' });
                                                        availableDropOffTime(e.target.selectedIndex);
                                                    }
                                                    }>
                                                    <option value={''} >Please Select Pick Up Time</option>
                                                    {
                                                        pickupTime.map((v, i) => {
                                                            return (<option key={i} value={v.value} >{v.value}</option>);
                                                        })
                                                    }
                                                </Input>
                                                {(notValid.error && notValid.type === 'pickupTime') && <label className="text-danger" > {notValid.message} </label>}
                                            </FormGroup>

                                        </Col>
                                        <Col md={12} >
                                            {isErrorPickupSlot && <span className="text-danger" >{errorMessage}</span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label className="d-flex" ><span className="text-danger" >* </span>Dropff Date
                                                {isProgressDropoffSlot && <div className="spinner " ></div>}
                                                </Label>
                                                <ReactDatePicker
                                                    disabled={!isPickupSlotAvailable}
                                                    selected={formValues.dropoffDate}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, dropoffDate: e });

                                                    }}
                                                    className="form-control react-date-picker-custom"
                                                    placeholderText={'mm/dd/yyyy'}
                                                    minDate={dropOffMinDate}
                                                    maxDate={dropOffMaxDate}
                                                    filterDate={isSunday}
                                                />

                                                {(notValid.error && notValid.type === 'dropoffDate') && <label className="text-danger" > {notValid.message} </label>}
                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >* </span>Dropff Time</Label>
                                                <Input type="select" name="select" value={formValues.dropoffTime}
                                                    onChange={(e) => {
                                                        setFormValues({ ...formValues, dropoffTime: e.target.value });

                                                    }
                                                    }
                                                    disabled={!isPickupSlotAvailable}
                                                >
                                                    <option value={''} >Please Select Drop Off Time</option>
                                                    {
                                                        dropoffTime.map((v, i) => {
                                                            return (<option key={i} value={v.value} >{v.value}</option>);
                                                        })
                                                    }
                                                </Input>
                                                {(notValid.error && notValid.type === 'dropoffTime') && <label className="text-danger" > {notValid.message} </label>}
                                            </FormGroup>

                                        </Col>
                                        <Col md={12} >
                                            {isErrorDropoffSlot && <span className="text-danger" >{errorMessage}</span>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} >
                                            <FormGroup tag="fieldset">
                                                <legend><span className="text-danger" >* </span>Addresses</legend>
                                                {(notValid.error && notValid.type === 'address') && <label className="text-danger" > {notValid.message} </label>}
                                                <div style={{ height: '8rem', overflowY: 'auto' }} >
                                                    {addresses.map((v, i) => {
                                                        return (
                                                            <FormGroup key={i} className="pl-0" check>
                                                                <Label check>
                                                                    <Input type="radio" name="radio1" checked={v?.id === selectedAddress?.id} onChange={() => setSelectedAddress(v)} />{' '}
                                                                    <img alt={'img'} className="icon-pin" src={Pin} /> {v?.postalCode} | {v?.street}
                                                                </Label>
                                                            </FormGroup>
                                                        );
                                                    })
                                                    }

                                                </div>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <FormGroup row>
                                        <Label for="driver-instruction" sm={12}>Driver Instruction</Label>
                                        <Col sm={12}>
                                            <Input type="textarea" name="text" id="driver-instruction" value={formValues.driverInstruction} onChange={(e) => setFormValues({ ...formValues, driverInstruction: e.target.value })} />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row  >
                                <Col sm="6" >
                                    <span className="text-danger" >*</span><span> Required fields</span>
                                </Col>
                            </Row>
                            <Row className=" " >
                                <Col sm="12" className=" " >
                                    <Button type={'button'} onClick={postOrder} disabled={isProgress || !isDropoffSlotAvailable || !isPickupSlotAvailable} className="btn-round btn-primary btn-add-modal" >
                                        {
                                            isProgress
                                                ?
                                                <div className="spinner" ></div>
                                                :
                                                ' Place Order'
                                        }
                                    </Button>
                                    <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
CreateCustomerOrder.propTypes = {
    history: PropTypes.object
};