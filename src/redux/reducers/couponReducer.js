import SeamlessImmutable from 'seamless-immutable';
import {isUndefined} from 'lodash';
import {
  FETCH_ALL_COUPONS,
  FETCH_ALL_COUPONS_SUCCESS,
  FETCH_COUPON_BY_ID,
  FETCH_COUPON_BY_ID_SUCCESS,
  VALIDATE_COUPON,
  VALIDATE_COUPON_SUCCESS,
  VALIDATE_COUPON_FAILED,
} from '../actions/types';

const INITIAL_STATE = SeamlessImmutable({
  couponById: {},
  allCoupons: [],
  coupon: {},
  meta: {loading: false, loaded: false},
});

const coupon = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_COUPONS:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ALL_COUPONS_SUCCESS:
      if (isUndefined(action.allCoupons)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            allCoupons: action.allCoupons,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case VALIDATE_COUPON:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case VALIDATE_COUPON_SUCCESS:
      if (isUndefined(action.coupon)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            coupon: action.coupon,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case VALIDATE_COUPON_FAILED:
      return INITIAL_STATE;
    case FETCH_COUPON_BY_ID:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_COUPON_BY_ID_SUCCESS:
      if (isUndefined(action.couponById)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            couponById: action.couponById,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    default:
      return state;
  }
};

export default coupon;
