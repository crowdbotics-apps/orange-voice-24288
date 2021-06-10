import {
  FETCH_ALL_ORDERS,
  FETCH_ORDER_HISTORY,
  FETCH_ORDER_BY_ID,
  SAVE_USER_ORDER,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDER_DETAILS_SUCCESS,
  HIDE_LOADER,
  CANCEL_ORDER,
  MAKE_ORDER_PAYMENT,
  FETCH_ALL_ACTIVE_ORDERS,
  FETCH_ALL_ACTIVE_ORDERS_SUCCESS,
  UPDATE_SAVED_USER_ORDER,
  FETCH_ALL_DRIVER_TASKS,
  FETCH_ALL_DRIVER_TASKS_SUCCESS,
  UPDATE_ORDER_STATUS,
  VALIDATE_ORDER_TIME_SLOT,
  NOTIFY_USER,
} from './types';

const fetchOrderDetailsSuccess = ({orderDetails}) => ({
  type: FETCH_ORDER_DETAILS_SUCCESS,
  orderDetails,
});

const fetchAllOrders = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_ORDERS,
  onSuccess,
  onFail,
});

const validateOrderTimeSlot = ({params, onSuccess, onFail}) => ({
  type: VALIDATE_ORDER_TIME_SLOT,
  params,
  onSuccess,
  onFail,
});

const fetchAllOrdersSuccess = ({allOrders, paging}) => ({
  type: FETCH_ALL_ORDERS_SUCCESS,
  allOrders,
  paging,
});

const fetchAllActiveOrders = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_ACTIVE_ORDERS,
  onSuccess,
  onFail,
});

const fetchAllActiveOrdersSuccess = ({allActiveOrders, paging}) => ({
  type: FETCH_ALL_ACTIVE_ORDERS_SUCCESS,
  allActiveOrders,
  paging,
});

const fetchOrderHistory = ({onSuccess, onFail, params}) => ({
  type: FETCH_ORDER_HISTORY,
  onSuccess,
  onFail,
  params: params,
});

const fetchOrderHistorySuccess = ({orderHistory}) => ({
  type: FETCH_ORDER_HISTORY_SUCCESS,
  orderHistory,
});

const fetchOrderById = ({params, onSuccess, onFail}) => ({
  type: FETCH_ORDER_BY_ID,
  params,
  onSuccess,
  onFail,
});

const fetchOrderByIdSuccess = ({orderById}) => ({
  type: FETCH_ORDER_BY_ID_SUCCESS,
  orderById,
});

const saveUserOrder = ({params, onSuccess, onFail}) => ({
  type: SAVE_USER_ORDER,
  params,
  onSuccess,
  onFail,
});

const updateSavedOrder = ({params, onSuccess, onFail}) => ({
  type: UPDATE_SAVED_USER_ORDER,
  params,
  onSuccess,
  onFail,
});

const cancelOrder = ({params, onSuccess, onFail}) => ({
  type: CANCEL_ORDER,
  params,
  onSuccess,
  onFail,
});

const makeOrderPayment = ({params, onSuccess, onFail}) => ({
  type: MAKE_ORDER_PAYMENT,
  params,
  onSuccess,
  onFail,
});

const fetchAllDriverTasks = ({params, onSuccess, onFail}) => ({
  type: FETCH_ALL_DRIVER_TASKS,
  params,
  onSuccess,
  onFail,
});

const fetchAllDriverTasksSuccess = ({driverTasks, paging}) => ({
  type: FETCH_ALL_DRIVER_TASKS_SUCCESS,
  driverTasks,
  paging,
});

const updateOrderStatus = ({params, onSuccess, onFail}) => ({
  type: UPDATE_ORDER_STATUS,
  params,
  onSuccess,
  onFail,
});

const notifyUser = ({params, onSuccess, onFail}) => ({
  type: NOTIFY_USER,
  params,
  onSuccess,
  onFail,
});

const hideLoader = () => ({
  type: HIDE_LOADER,
});

export default {
  fetchAllOrders,
  fetchOrderHistory,
  fetchOrderById,
  saveUserOrder,
  updateSavedOrder,
  fetchAllOrdersSuccess,
  fetchOrderHistorySuccess,
  fetchOrderByIdSuccess,
  fetchOrderDetailsSuccess,
  cancelOrder,
  makeOrderPayment,
  fetchAllActiveOrders,
  fetchAllActiveOrdersSuccess,
  fetchAllDriverTasks,
  fetchAllDriverTasksSuccess,
  updateOrderStatus,
  hideLoader,
  validateOrderTimeSlot,
  notifyUser,
};
