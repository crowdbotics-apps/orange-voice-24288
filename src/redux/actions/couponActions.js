import {
  FETCH_ALL_COUPONS,
  FETCH_ALL_COUPONS_SUCCESS,
  FETCH_COUPON_BY_ID,
  FETCH_COUPON_BY_ID_SUCCESS,
  VALIDATE_COUPON_SUCCESS,
  VALIDATE_COUPON,
  HIDE_LOADER,
  VALIDATE_COUPON_FAILED,
  VALIDATE_COUPON_REFFERAL,
  VALIDATE_COUPON_REFFERAL_SUCCESS,
  VALIDATE_COUPON_REFFERAL_FAILED,
} from './types';

const fetchAllCoupons = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_COUPONS,
  onSuccess,
  onFail,
});

const fetchAllCouponsSuccess = ({allCoupons}) => ({
  type: FETCH_ALL_COUPONS_SUCCESS,
  allCoupons,
});

const fetchCouponById = ({params, onSuccess, onFail}) => ({
  type: FETCH_COUPON_BY_ID,
  params,
  onSuccess,
  onFail,
});

const fetchCouponByIdSuccess = ({couponById}) => ({
  type: FETCH_COUPON_BY_ID_SUCCESS,
  couponById,
});

const validateCoupon = ({params, onSuccess, onFail}) => ({
  type: VALIDATE_COUPON,
  params,
  onSuccess,
  onFail,
});

const validateCouponSuccess = ({coupon}) => ({
  type: VALIDATE_COUPON_SUCCESS,
  coupon,
});

const validateCouponFailed = () => ({
  type: VALIDATE_COUPON_FAILED,
});

const validateCouponReferral = ({onSuccess, onFail}) => ({
  type: VALIDATE_COUPON_REFFERAL,
  onSuccess,
  onFail,
});

const validateCouponReferralSuccess = ({coupon}) => ({
  type: VALIDATE_COUPON_REFFERAL_SUCCESS,
  coupon,
});

const validateCouponReferralFailed = () => ({
  type: VALIDATE_COUPON_REFFERAL_FAILED,
});

const hideLoader = () => ({
  type: HIDE_LOADER,
});

export default {
  fetchAllCoupons,
  fetchAllCouponsSuccess,
  fetchCouponById,
  fetchCouponByIdSuccess,
  validateCoupon,
  validateCouponSuccess,
  validateCouponFailed,
  hideLoader,
  validateCouponReferral,
  validateCouponReferralSuccess,
  validateCouponReferralFailed,
};
