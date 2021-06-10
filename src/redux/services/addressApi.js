import {api} from './api';
import {API_URL_SUFFIX} from './config';

// {
//   "userId": 0,
//   "type": "string",
//   "mainAddress": "string",
//   "street": "string",
//   "suite": "string",
//   "city": "string",
//   "state": "string",
//   "postalCode": "string",
//   "phone": "string",
//   "lng": "string",
//   "lat": "string",
//    isPrimary: true,
// }

const getUserAddress = (id) => {
  return api.get(`${API_URL_SUFFIX}address/?profile=${id}`);
};

const postUserAddress = (params) => {
  return api.post(`${API_URL_SUFFIX}address/`, params);
};

const updateUserAddress = (params) => {
  return api.put(`${API_URL_SUFFIX}address/${params.id}/`, params);
};

const deleteUserAddress = (id) => {
  return api.delete(`${API_URL_SUFFIX}address/${id}/`);
};

export default {
  getUserAddress,
  updateUserAddress,
  postUserAddress,
  deleteUserAddress,
};
