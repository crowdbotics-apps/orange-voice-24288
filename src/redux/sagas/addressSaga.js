import allActions from '../actions/index';
import {put, call, takeLatest} from 'redux-saga/effects';
import {
  FETCH_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  SAVE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
} from '../actions/types';
import allAPIServices from '../services/index';

/**
 ******** FUNCTION ************
 */

export function* fetchUserAddress(action) {
  try {
    const response = yield call(
      allAPIServices.addressApi.getUserAddress,
      action.profile_id,
    );
    yield put(
      allActions.addressActions.fetchUserAddressSuccess({
        address: response.data.results,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* updateUserAddress(action) {
  try {
    const response = yield call(
      allAPIServices.addressApi.updateUserAddress,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* saveUserAddress(action) {
  try {
    const response = yield call(
      allAPIServices.addressApi.postUserAddress,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* deleteUserAddress(action) {
  try {
    const response = yield call(
      allAPIServices.addressApi.deleteUserAddress,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

/**
 ************ WATCHER**********
 */

export function* watchFetchUserAddress() {
  yield takeLatest(FETCH_USER_ADDRESS, fetchUserAddress);
}

export function* watchUpdateUserAddress() {
  yield takeLatest(UPDATE_USER_ADDRESS, updateUserAddress);
}

export function* watchSaveUserAddress() {
  yield takeLatest(SAVE_USER_ADDRESS, saveUserAddress);
}

export function* watchDeleteUserAddress() {
  yield takeLatest(DELETE_USER_ADDRESS, deleteUserAddress);
}
