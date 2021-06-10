import {
  SIGN_IN,
  FORGOT_PASSWORD,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP,
  LOADER,
  SOCIAL_SIGN_IN,
  SOCIAL_SIGN_IN_SUCCESS,
  UPDATE_PLAYER_ID,
  DRIVER_SIGN_UP,
  DRIVER_SIGN_UP_SUCCESS,
  DRIVER_SIGN_IN,
  DRIVER_SIGN_IN_FAIL,
  DRIVER_SIGN_IN_SUCCESS,
} from './types';

const signIn = ({params, onSuccess, onFail}) => ({
  type: SIGN_IN,
  params,
  onSuccess,
  onFail,
});

const updatePlayerId = ({params, onSuccess, onFail}) => ({
  type: UPDATE_PLAYER_ID,
  params,
  onSuccess,
  onFail,
});

const signInSuccess = ({response, access_token}) => ({
  type: SIGN_IN_SUCCESS,
  response,
  access_token,
});

const socialSignIn = ({params, onSuccess, onFail}) => ({
  type: SOCIAL_SIGN_IN,
  params,
  onSuccess,
  onFail,
});

const socialSignInSuccess = ({response, access_token}) => ({
  type: SOCIAL_SIGN_IN_SUCCESS,
  response,
  access_token,
});

const signOut = ({params, onSuccess, onFail}) => ({
  type: SIGN_OUT,
  params,
  onSuccess,
  onFail,
});

const signUp = ({params, onSuccess, onFail}) => ({
  type: SIGN_UP,
  params,
  onSuccess,
  onFail,
});

const signUpSuccess = ({response}) => ({
  type: SIGN_UP_SUCCESS,
  response,
});

const driverSignUp = ({params, onSuccess, onFail}) => ({
  type: DRIVER_SIGN_UP,
  params,
  onSuccess,
  onFail,
});

const driverSignUpSuccess = ({response}) => ({
  type: DRIVER_SIGN_UP_SUCCESS,
  response,
});

const forgotPassword = ({params, onSuccess, onFail}) => ({
  type: FORGOT_PASSWORD,
  params,
  onSuccess,
  onFail,
});

const hideLoader = () => ({
  type: LOADER,
});

const driverSignIn = ({params, onSuccess, onFail}) => ({
  type: DRIVER_SIGN_IN,
  params,
  onSuccess,
  onFail,
});

const driverSignInSuccess = ({response, access_token}) => ({
  type: DRIVER_SIGN_IN_SUCCESS,
  response,
  access_token,
});

export default {
  signIn,
  signInSuccess,
  signOut,
  forgotPassword,
  signUp,
  signUpSuccess,
  hideLoader,
  socialSignIn,
  socialSignInSuccess,
  updatePlayerId,
  driverSignUp,
  driverSignUpSuccess,
  driverSignIn,
  driverSignInSuccess,
};
