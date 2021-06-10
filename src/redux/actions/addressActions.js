import {
  FETCH_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  FETCH_USER_ADDRESS_SUCCESS,
  HIDE_LOADER,
  SAVE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
} from './types';

const fetchUserAddress = ({profile_id, onSuccess, onFail}) => ({
  type: FETCH_USER_ADDRESS,
  onSuccess,
  onFail,
  profile_id,
});

const fetchUserAddressSuccess = ({address}) => ({
  type: FETCH_USER_ADDRESS_SUCCESS,
  address,
});

const updateUserAddress = ({params, onSuccess, onFail}) => ({
  type: UPDATE_USER_ADDRESS,
  params,
  onSuccess,
  onFail,
});

const saveUserAddress = ({params, onSuccess, onFail}) => ({
  type: SAVE_USER_ADDRESS,
  params,
  onSuccess,
  onFail,
});

const deleteUserAddress = ({params, onSuccess, onFail}) => ({
  type: DELETE_USER_ADDRESS,
  params,
  onSuccess,
  onFail,
});

const hideLoader = () => ({
  type: HIDE_LOADER,
});

export default {
  fetchUserAddress,
  fetchUserAddressSuccess,
  updateUserAddress,
  saveUserAddress,
  deleteUserAddress,
  hideLoader,
};
