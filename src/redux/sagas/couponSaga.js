import {put, takeLatest, call} from 'redux-saga/effects';
import allAPIServices from '../services/index';
import allActions from '../actions';
import {
  FETCH_ALL_COUPONS,
  FETCH_COUPON_BY_ID,
  VALIDATE_COUPON,
  VALIDATE_COUPON_REFFERAL,
} from '../actions/types';
import storage from '../utils/storage';

/**
 ******** FUNCTION ************
 */

export function* fetchAllCoupons(action) {
  try {
    const response = yield call(allAPIServices.couponApi.getAllCoupons);
    yield put(
      allActions.couponActions.fetchAllCouponsSuccess({
        allCoupons: response.data.result,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  }
}

export function* fetchCouponById(action) {
  try {
    const response = yield call(allAPIServices.couponApi.getCouponById, {
      id: action.params,
    });
    yield put(
      allActions.couponActions.fetchCouponByIdSuccess({
        couponById: response.data.result,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  }
}

export function* validateCoupon(action) {
  try {
    const response = yield call(
      allAPIServices.couponApi.validateCoupon,
      action.params,
    );
    yield put(
      allActions.couponActions.validateCouponSuccess({
        coupon: response.data.result,
      }),
    );
    action.onSuccess && action.onSuccess(response.data.result);
  } catch (ex) {
    yield put(allActions.couponActions.validateCouponFailed());
    action.onFail && action.onFail(ex);
  }
}

export function* validateCouponReferral(action) {
  try {
    const response = yield call(
      allAPIServices.couponApi.validateCouponReferral,
    );
    const result = response.data.result;
    yield put(
      allActions.couponActions.validateCouponReferralSuccess({
        coupon: result,
      }),
    );
    action.onSuccess && action.onSuccess(response.data);
  } catch (ex) {
    yield put(allActions.couponActions.validateCouponReferralFailed());
    action.onFail && action.onFail(ex);
  }
}

export function* clearCoupon({onFail}) {
  try {
    yield put(allActions.couponActions.validateCouponFailed());
  } catch (ex) {
    onFail && onFail();
  }
}

/**
 ************ WATCHER**********
 */

export function* watchFetchAllCoupons() {
  yield takeLatest(FETCH_ALL_COUPONS, fetchAllCoupons);
}

export function* watchFetchCouponById() {
  yield takeLatest(FETCH_COUPON_BY_ID, fetchCouponById);
}

export function* watchValidateCoupon() {
  yield takeLatest(VALIDATE_COUPON, validateCoupon);
}

export function* watchValidateCouponRefferal() {
  yield takeLatest(VALIDATE_COUPON_REFFERAL, validateCouponReferral);
}

export function* watchClearCoupon() {
  yield takeLatest('CLEAR_ALL', clearCoupon);
}
