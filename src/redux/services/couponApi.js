import {api} from './api';

const getAllCoupons = () => {
  return api.get('/coupon/all');
};

const getCouponById = (id) => {
  return api.get(`/coupon/${id}`);
};

const validateCoupon = (params) => {
  return api.post('/coupon/validatepromo', params);
};

const validateCouponReferral = () => {
  return api.get('/coupon/validatereferral');
};

export default {
  getAllCoupons,
  getCouponById,
  validateCoupon,
  validateCouponReferral,
};
