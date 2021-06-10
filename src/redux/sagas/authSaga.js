import allActions from '../actions/index';
import {put, call, takeLatest} from 'redux-saga/effects';
import {
  SIGN_IN,
  FORGOT_PASSWORD,
  SIGN_OUT,
  SIGN_UP,
  SOCIAL_SIGN_IN,
  UPDATE_PLAYER_ID,
  DRIVER_SIGN_UP,
} from '../actions/types';
import storage from '../utils/storage';
import {setCredentials} from '../services/api';
import allAPIServices from '../services/index';

/**
 ******** FUNCTION ************
 */

export function* signInSaga(action) {
  try {
    const response = yield call(
      action.params?.type === 'driver'
        ? allAPIServices.authApi.driverSignIn
        : allAPIServices.authApi.signIn,
      action.params,
    );

    const {
      token,
      refreshToken,
      userName,
      isProfileCompleted,
      userId,
    } = response.data;
    console.log('USER ID ' + userId);
    yield put(
      allActions.authActions.signInSuccess({response, access_token: token}),
    );

    storage.setIsSocial(false).then(() => {});
    storage.setIsProfileCompleted(isProfileCompleted).then(() => {});
    storage
      .saveCredentials(action.params.type, token, refreshToken, userName)
      .then(() => {
        setCredentials(token);
        action.onSuccess && action.onSuccess(response.data);
      });
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* socialSignInSaga(action) {
  try {
    const response = yield call(
      allAPIServices.authApi.socialLogin,
      action.params,
    );
    const {token, refreshToken, userName, isProfileCompleted} = response.data;

    yield put(
      allActions.authActions.signInSuccess({response, access_token: token}),
    );

    storage.setIsSocial(true).then(() => {});
    storage.setIsProfileCompleted(isProfileCompleted).then(() => {});
    storage
      .saveCredentials(action.params.type, token, refreshToken, userName)
      .then(() => {
        setCredentials(token);
        action.onSuccess && action.onSuccess(response);
      });
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* signUpSaga(action) {
  try {
    const response = yield call(allAPIServices.authApi.signup, action.params);
    yield put(allActions.authActions.signUpSuccess({response: response.data}));
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* driverSignUpSaga(action) {
  try {
    const response = yield call(
      allAPIServices.authApi.driverSignUp,
      action.params,
    );
    yield put(allActions.authActions.signUpSuccess({response: response.data}));
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* updatePlayerIdSaga(action) {
  try {
    const response = yield call(
      allAPIServices.authApi.updatePlayerId,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* signOutSaga(action) {
  try {
    console.log('LOGOUT CALLED');
    const response = yield call(allAPIServices.authApi.logOut, action.params);

    storage.clearCredentials();
    setCredentials(null, null, null);
    // action.onSuccess && action.onSuccess();
    console.log('RESPONSE ' + response.status);
    action.onSuccess && action.onSuccess(response);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* forgotPasswordSaga(action) {
  try {
    const response = yield call(
      allAPIServices.authApi.forgotPassword,
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

export function* watchSignUp() {
  yield takeLatest(SIGN_UP, signUpSaga);
}

export function* watchDriverSignUp() {
  yield takeLatest(DRIVER_SIGN_UP, driverSignUpSaga);
}

export function* watchSignOut() {
  yield takeLatest(SIGN_OUT, signOutSaga);
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga);
}

export function* watchSignIn() {
  yield takeLatest(SIGN_IN, signInSaga);
}

export function* watchUpdatePlayerId() {
  yield takeLatest(UPDATE_PLAYER_ID, updatePlayerIdSaga);
}

export function* watchSocialSignIn() {
  yield takeLatest(SOCIAL_SIGN_IN, socialSignInSaga);
}
