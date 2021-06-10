import allActions from '../actions/index';
import {put, call, takeLatest} from 'redux-saga/effects';
import {
  FETCH_USER_PROFILE,
  GET_DRIVER_SIGN_UP,
  RESET_USER_PASSWORD,
  UPDATE_USER_PROFILE,
} from '../actions/types';
import allAPIServices from '../services/index';
import storage from '../utils/storage';

/**
 ******** FUNCTION ************
 */

export function* fetchUserProfile(action) {
  try {
    const response = yield call(
      action.params.userType === 'driver'
        ? allAPIServices.userApi.getDriverProfile
        : allAPIServices.userApi.getUserProfile,
    );
    yield put(
      allActions.userActions.fetchUserProfileSuccess({
        user: response.data.result,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.userActions.hideLoader());
  }
}

export function* updateUserProfile(action) {
  try {
    const response = yield call(
      allAPIServices.userApi.updateUserProfile,
      action.params,
    );

    const {postalCode, phoneNo} = action.params;

    if (postalCode && phoneNo) {
      storage.setIsProfileCompleted(true).then(() => {});
    }

    yield put(
      allActions.userActions.fetchUserProfileSuccess({
        user: response.data.result,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.userActions.hideLoader());
  }
}

export function* resetUserPassword(action) {
  try {
    const response = yield call(
      allAPIServices.userApi.resetUserPassword,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.userActions.hideLoader());
  }
}

export function* getDriverSignUp(action) {
  try {
    const response = yield call(allAPIServices.userApi.getDriverSignUp);
    action.onSuccess && action.onSuccess(response.data.result);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.userActions.hideLoader());
  }
}

/**
 ************ WATCHER**********
 */

export function* watchFetchUserProfile() {
  yield takeLatest(FETCH_USER_PROFILE, fetchUserProfile);
}

export function* watchUpdateUserProfile() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export function* watchResetUserPassword() {
  yield takeLatest(RESET_USER_PASSWORD, resetUserPassword);
}

export function* watchGetDriverSignUp() {
  yield takeLatest(GET_DRIVER_SIGN_UP, getDriverSignUp);
}
