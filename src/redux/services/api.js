import axios from 'axios';
import {BASE_API_URL} from './config';
import storage from '../../redux/utils/storage';
import {errorMessage} from '../utils/alerts';
import NetworkUtils from '../utils/networkUtils';
import {LogBox} from 'react-native';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  // console.log('[API Request]', request);

  return request;
});

api.interceptors.response.use(
  (response) => {
    // console.log('[API Response]', response);

    return response;
  },
  async (error) => {
    // console.log('[API ERROR]', error);

    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      !originalRequest?._retry &&
      api.defaults.headers.common.Authorization
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Token ' + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const credentials = await storage.loadCredentials();
      const {refresh_token, user_email} = credentials;
      return new Promise(function (resolve, reject) {
        api
          .post('/user/refreshtoken', {
            token: refresh_token,
            email: user_email,
          })
          .then(async ({data}) => {
            const {token, refreshToken, userName} = data;
            await storage.saveCredentials(
              'user',
              token,
              refreshToken,
              userName,
            );
            setCredentials(token);
            originalRequest.headers.Authorization = 'Token ' + token;
            processQueue(null, token);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    let data = {
      ...error?.response?.data,
      status: error?.response?.status,
    };

    // if (!NetworkUtils.isNetworkAvailable()) {
    //   errorMessage({
    //     message: 'Oops! There is no Internet Connection',
    //     description:
    //       "We're having a little difficulty in connecting to the Internet. Please check your connection and try again.",
    //   });
    // }

    return Promise.reject(data);
  },
);

export const setCredentials = (access_token) => {
  api.defaults.headers.common.Authorization = `Token ${access_token}`;
};

export const clearCredentials = () => {
  api.defaults.headers.common.Authorization = '';
};
