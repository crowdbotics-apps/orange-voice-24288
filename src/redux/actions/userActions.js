import {
  FETCH_USER_PROFILE,
  RESET_USER_PASSWORD,
  UPDATE_USER_PROFILE,
  GET_DRIVER_SIGN_UP,
  FETCH_USER_PROFILE_SUCCESS,
  HIDE_LOADER,
} from './types';

const fetchUserProfile = ({params, onSuccess, onFail}) => ({
  type: FETCH_USER_PROFILE,
  params,
  onSuccess,
  onFail,
});

const fetchUserProfileSuccess = ({user}) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  user,
});

const resetUserPassword = ({params, onSuccess, onFail}) => ({
  type: RESET_USER_PASSWORD,
  params,
  onSuccess,
  onFail,
});

const updateUserProfile = ({params, onSuccess, onFail}) => ({
  type: UPDATE_USER_PROFILE,
  params,
  onSuccess,
  onFail,
});

const getDriverSignUp = ({onSuccess, onFail}) => ({
  type: GET_DRIVER_SIGN_UP,
  onSuccess,
  onFail,
});

const hideLoader = () => ({
  type: HIDE_LOADER,
});

export default {
  updateUserProfile,
  fetchUserProfile,
  resetUserPassword,
  fetchUserProfileSuccess,
  getDriverSignUp,
  hideLoader,
};
