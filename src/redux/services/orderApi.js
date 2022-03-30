import {api} from './api';
import moment from 'moment';
import {API_URL_SUFFIX} from './config';

const getAllOrders = () => {
  return api.get(`${API_URL_SUFFIX}order/`);
};

const getAllActiveOrders = (params) => {
  return api.get(
    `${API_URL_SUFFIX}customer/${
      params?.profile_id
    }/order?page=${1}&status=InProgress`,
  );
};

const getOrderHistory = ({pageSize = 1000, profile_id}) => {
  return api.get(
    `${API_URL_SUFFIX}customer/${profile_id}/order?page=${1}&limit=${pageSize}`,
  );
};

const getOrderById = (id) => {
  return api.get(`${API_URL_SUFFIX}order/${id}/`);
};

const postOrderCheckout = (params) => {
  return api.post(`${API_URL_SUFFIX}order/`, params);
};

const updateOrderCheckout = (params) => {
  return api.put(`${API_URL_SUFFIX}order/${params.id}/`, params);
};

const makeOrderPayment = (params) => {
  return api.post(`${API_URL_SUFFIX}order-payment`, params);
};

const cancelOrder = (id) => api.put(`/order/cancel/${id}`);

const validateOrderTimeSlot = (params) => api.post('api/v1/time-slots', params);

const notifyUser = (params) => api.post('/driver/notifyuser', {taskId: params});

const getAllDriverTasks = (id) => {
  const date = moment().format('YYYY-MM-DD');
  return api.get(
    `${API_URL_SUFFIX}driver/${id}/order?createdOn=${date}%20T00:00&filters[%3C%3DcreatedOn]=${date}%20T23:59&page=1&limit=1000`,
  );
};

// {
//   "orderId": 0,
//   "status": "string",
//   "driverId": 0,
//   "driverTaskId": 0
// }
const updateOrderStatus = (params) => {
  return api.put(`${API_URL_SUFFIX}order/status/${params?.orderId}/`, params);
};

export default {
  getAllOrders,
  getOrderHistory,
  getOrderById,
  postOrderCheckout,
  makeOrderPayment,
  cancelOrder,
  getAllActiveOrders,
  updateOrderCheckout,
  getAllDriverTasks,
  updateOrderStatus,
  validateOrderTimeSlot,
  notifyUser,
};
