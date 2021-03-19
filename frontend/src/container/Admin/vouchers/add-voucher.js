
import React, { useState, useCallback } from 'react';
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
    FormGroup
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { VoucherActions } from '../../../store/actions/VoucherActions';
import moment from 'moment';


function AddVoucher({ history }) {
    const dispatch = useDispatch();
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const isProgress = useSelector(store => store?.voucher?.isProgress);
    const [formValues, setFormValues] = useState({
        code: '',
        validFrom: '',
        validTo: '',
        couponType: 'Promo',
        offerType: 'Amount',
        offerValue: '',
        minProduct: '',
        minAmount: '',
        maxRedeem: '',
        numberRedeem: '',
        isActive: true,

    });


    const addVoucher = useCallback((e) => {
        e.preventDefault();
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (formValues.couponType === 'Promo') {
            if (!formValues.code) {
                setNotValid({ error: true, type: 'code', message: 'Please provide coupon code' });
                return;
            }
            if (formValues.code.length < 3) {
                setNotValid({ error: true, type: 'code', message: 'Coupon code is too short' });
                return;
            }
            if (formValues.code.length > 7) {
                setNotValid({ error: true, type: 'code', message: 'Coupon code not greater than 7 characters' });
                return;
            }
            if (formValues.validFrom === '') {
                setNotValid({ error: true, type: 'validFrom', message: 'Please select valid date' });
                return;
            }
            if (formValues.validTo === '') {
                setNotValid({ error: true, type: 'validTo', message: 'Please select valid date' });
                return;
            }
            if (new Date(formValues.validTo).getTime() < new Date(formValues.validFrom)) {
                setNotValid({ error: true, type: 'validTo', message: 'Valid till must be greater than valid from' });
                return;
            }
        }
        if (!formValues.offerValue) {
            setNotValid({ error: true, type: 'offerValue', message: 'Please provide offer value' });
            return;
        }
        if (Number(formValues.offerValue) === 0) {
            setNotValid({ error: true, type: 'offerValue', message: 'Offer value  must be greater than 0' });
            return;
        }
        if (Number(formValues.offerValue) < 0) {
            setNotValid({ error: true, type: 'offerValue', message: 'Negative numbers not allow in offer value' });
            return;
        }
        if (formValues.offerValue.length > 10) {
            setNotValid({ error: true, type: 'offerValue', message: 'Offer value not exceed 10 characters' });
            return;
        }
        if (formValues.couponType === 'Referral') {

            if (!formValues.maxRedeem) {
                setNotValid({ error: true, type: 'maxRedeem', message: 'Please provide max redeem ' });
                return;
            }
            if (Number(formValues.maxRedeem) === 0) {
                setNotValid({ error: true, type: 'maxRedeem', message: 'Max redeem value  must be greater than 0' });
                return;
            }
            

        }
        if (Number(formValues.maxRedeem) < 0) {
            setNotValid({ error: true, type: 'maxRedeem', message: 'Negative numbers not allowed in max redeem' });
            return;
        }
        if (Number(formValues.maxRedeem) > 9999) {
            setNotValid({ error: true, type: 'maxRedeem', message: 'Max redeem should not exceed 9999' });
            return;
        }
        // if (Number(formValues.numberRedeem) < 0) {
        //     setNotValid({ error: true, type: 'numberRedeem', message: 'Negative numbers not allowed in  redeemed' });
        //     return;
        // }
        if (Number(formValues.minProduct) < 0) {
            setNotValid({ error: true, type: 'minProduct', message: 'Negative numbers not allow in min product' });
            return;
        }
        if (Number(formValues.minProduct) > 9999) {
            setNotValid({ error: true, type: 'minProduct', message: 'Min product should not exceed 9999' });
            return;
        }

        // else if (!formValues.minAmount) {
        //     setNotValid({ error: true, type: 'minAmount', message: 'Please provide min amount' });
        //     return;
        // }
        if (Number(formValues.minAmount) < 0) {
            setNotValid({ error: true, type: 'minAmount', message: 'Negative numbers not allow in min amount' });
            return;
        }
        if (Number(formValues.minAmount) > 9999) {
            setNotValid({ error: true, type: 'minAmount', message: 'Min amount should not exceed 9999' });
            return;
        }
        let body = {
            code: formValues.code,
            validFrom: formValues.couponType === 'Promo' ? new Date(formValues.validFrom).toISOString() : '',
            validTo: formValues.couponType === 'Promo' ? new Date(formValues.validTo).toISOString() : '',
            couponType: formValues.couponType,
            offerType: formValues.offerType,
            offerValue: Number(formValues.offerValue),
            minProduct: Number(formValues.minProduct),
            minAmount: Number(formValues.minAmount),
            maxRedeem: Number(formValues.maxRedeem),
            numberRedeem: Number(formValues.numberRedeem),
            isActive: formValues.isActive,
        };
        dispatch(VoucherActions.addVoucher(body, history));

    }, [formValues, dispatch, notValid, history]);

    const onChangeCouponType = useCallback((e) => {
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        setFormValues({ ...formValues, couponType: e.target.value });

    }, [formValues, notValid]);
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Add Voucher</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={addVoucher} >
                                <Row>
                                    <Col sm="6">
                                        <FormGroup className=""  >
                                            <label><span className="text-danger" >*</span> Coupon Type </label>
                                            <Input
                                                type="select"
                                                value={formValues.couponType}
                                                onChange={onChangeCouponType}
                                                name="select"
                                                id="coupon-type">
                                                <option value={'Promo'} >Promo</option>
                                                <option value={'Referral'} >Referral</option>
                                            </Input>
                                            {(notValid.error && notValid.type === 'couponType') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup className=""  >
                                            <label><span className="text-danger" >*</span> Offer Type </label>
                                            <Input
                                                type="select"
                                                value={formValues.offerType}
                                                onChange={(e) => setFormValues({ ...formValues, offerType: e.target.value })}
                                                name="select"
                                                id="offer-type"
                                            >
                                                <option value={'Amount'} >Amount</option>
                                                <option value={'Percentage'} >Percentage</option>
                                            </Input>
                                            {(notValid.error && notValid.type === 'offerType') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {formValues.couponType === 'Promo' ? <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Coupon Code </label>
                                            <Input
                                                autoFocus
                                                placeholder="Coupon Code"
                                                type="text"
                                                value={formValues.code}
                                                onChange={(e) => setFormValues({ ...formValues, code: e.target.value.split(' ').join('') })}
                                            />
                                            {(notValid.error && notValid.type === 'code') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Valid From </label>
                                            <Input
                                                placeholder="Valid From"
                                                type="date"
                                                min={moment(new Date()).format('YYYY-MM-DD')}
                                                value={formValues.validFrom}
                                                onChange={(e) => setFormValues({ ...formValues, validFrom: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'validFrom') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row> : null}

                                <Row>
                                    {formValues.couponType === 'Promo' ? <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Valid Till </label>
                                            <Input
                                                placeholder="Valid Till"
                                                type="date"
                                                min={moment(new Date()).format('YYYY-MM-DD')}
                                                value={formValues.validTo}
                                                onChange={(e) => setFormValues({ ...formValues, validTo: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'validTo') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                        : null
                                    }
                                    <Col sm="6">
                                        <FormGroup>
                                            <label><span className="text-danger" >*</span> Offer Value{formValues.offerType === 'Amount' ? ' ($)' : ' (%)'}</label>
                                            <Input
                                                placeholder="Offer Value"
                                                type="number"
                                                value={formValues.offerValue}
                                                onChange={(e) => setFormValues({ ...formValues, offerValue: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'offerValue') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    {formValues.couponType === 'Referral' && <Col sm="6">
                                        <FormGroup>
                                            <label>{formValues.couponType === 'Referral' ? <span className="text-danger" >*</span> : null} Max Redeem </label>
                                            <Input
                                                placeholder="Max Redeem"
                                                type="number"
                                                value={formValues.maxRedeem}
                                                onChange={(e) => setFormValues({ ...formValues, maxRedeem: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'maxRedeem') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>}
                                </Row>


                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Min Products </label>
                                            <Input
                                                placeholder="Min Products"
                                                type="number"
                                                value={formValues.minProduct}
                                                onChange={(e) => setFormValues({ ...formValues, minProduct: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'minProduct') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Min Amount </label>
                                            <Input
                                                placeholder="Min Amount"
                                                type="number"
                                                value={formValues.minAmount}
                                                onChange={(e) => setFormValues({ ...formValues, minAmount: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'minAmount') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {formValues.couponType === 'Promo' && <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label>{formValues.couponType === 'Referral' ? <span className="text-danger" >*</span> : null} Max Redeem </label>
                                            <Input
                                                placeholder="Max Redeem"
                                                type="number"
                                                value={formValues.maxRedeem}
                                                onChange={(e) => setFormValues({ ...formValues, maxRedeem: e.target.value })}
                                            />
                                            {(notValid.error && notValid.type === 'maxRedeem') && <label className='ml-3 text-danger' >{notValid.message}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>}

                                <Row>
                                    <Col sm="6">
                                        <div>
                                            <label><span className="text-danger" >*</span>  Status</label>
                                        </div>
                                        <label className="mr-2 ml-2" style={{ width: '3rem' }}>{formValues.isActive ? 'Active' : 'In Active'}</label>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                value={formValues.isActive}
                                                checked={formValues.isActive}
                                                onChange={() => setFormValues({ ...formValues, isActive: !formValues.isActive })}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </Col>
                                </Row>
                                <Row className=" " >
                                    <Col sm="6" >
                                        <span className="text-danger" >*</span><span> Required fields</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <Button className="btn-round btn-primary btn-add-modal"  >

                                            {
                                                isProgress
                                                    ?
                                                    <div className="spinner" ></div>
                                                    :
                                                    ' Add Voucher'
                                            }
                                        </Button>
                                        <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

AddVoucher.propTypes = {
    history: PropTypes.object
};
export default AddVoucher;
