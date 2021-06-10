import {api} from './api';
import {API_URL_SUFFIX} from './config';

// {
//   "email": "string",
//   "password": "string"
// }
const signIn = (params) => {
  // return api.post(`/${params.type}/sign`, params);
  return api.post('rest-auth/login', {
    password: params.password,
    email: params.userName,
  });
};

const driverSignIn = (params) => {
  return api.post(`${API_URL_SUFFIX}driver/signin`, params);
};

// {
//   "email": "string"
// }
const forgotPassword = (params) => {
  return api.put(`/${params.type}/forgotpassword`, params);
};

// {
//   "password": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "email": "string",
// }
const signup = (params) => {
  // return api.post(`/${params.type}/signup`, params);
  return api.post('rest-auth/registration/', params);
};

// {
//   "firstName": "string",
//   "contactNumber": "string",
//   "email": "string",
//   "licence": "string",
// }
const driverSignUp = (params) => {
  return api.post(`/${params.type}`, params);
};

// {
//   "email": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "SocialPlatform": "string",
//   "Token": "string",
// }
const socialLogin = (params) => {
  return api.post('api/v1/social-login', params);
};

// {
//   "password": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "email": "string",
// }
const updatePlayerId = ({playerId}) => {
  // return api.put(`/User/playerId/${playerId}`);
  return api.post('api/v1/device/', {player_id: playerId});
};

// {
//   "Token": "string",
//   "Email": "string"
// }
const logOut = (params) => {
  console.log('PARAMS ' + params);
  return api.post('rest-auth/logout/', params);
};

export default {
  signup,
  forgotPassword,
  signIn,
  socialLogin,
  updatePlayerId,
  driverSignUp,
  logOut,
  driverSignIn,
};
