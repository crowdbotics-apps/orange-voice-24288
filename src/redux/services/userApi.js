import {api} from './api';
import {API_URL_SUFFIX} from './config';

// firstName*	string
// maxLength: 50
// lastName*	string
// maxLength: 50
// email*	string($email)
// phoneNo*	string($tel)
// postalCode*	string
// isResetPassword	boolean

const getUserProfile = () => {
  return api.get('users/me');
};

const getDriverProfile = () => {
  return api.get('/driver/profile');
};

const getDriverSignUp = (name = 'driversignup') => {
  return api.get(`/appconfiguration/name/${name}`);
};

const updateUserProfile = (params) => {
  return api.put(`api/v1/profile/${params.profile_id}/`, {
    ...params,
    fullname: params.firstName + ' ' + params.lastName,
  });
};

// {
//   "newPassword": "string"
// }

const resetUserPassword = (params) => {
  return api.put('rest-auth/password/reset/', params);
};

export default {
  getUserProfile,
  resetUserPassword,
  updateUserProfile,
  getDriverProfile,
  getDriverSignUp,
};
