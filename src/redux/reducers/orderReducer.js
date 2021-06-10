import SeamlessImmutable from 'seamless-immutable';
import {isUndefined} from 'lodash';
import {
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_HISTORY,
  FETCH_ORDER_HISTORY_SUCCESS,
  HIDE_LOADER,
  FETCH_ORDER_BY_ID,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ALL_ACTIVE_ORDERS,
  FETCH_ALL_ACTIVE_ORDERS_SUCCESS,
  FETCH_ALL_DRIVER_TASKS,
  FETCH_ALL_DRIVER_TASKS_SUCCESS,
} from '../actions/types';
import moment from 'moment';
import {progressColor, progressCount, progressImage} from '../utils/orderUtil';

const INITIAL_STATE = SeamlessImmutable({
  orderDetails: {},
  orderById: {},
  orderHistory: [],
  allActiveOrders: [],
  orderHistoryPaging: {},
  activeOrderPaging: {},
  driverTasks: [],
  meta: {loading: false, loaded: false},
});

const order = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDER_DETAILS_SUCCESS:
      return state.merge(
        {
          orderDetails: action.orderDetails,
        },
        {deep: true},
      );
    case 'CLEAR_ALL':
      return state.replace(
        {
          ...state,
          orderDetails: {},
        },
        {deep: true},
      );
    case FETCH_ORDER_HISTORY:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ORDER_HISTORY_SUCCESS:
      if (isUndefined(action.orderHistory)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            orderHistoryPaging: action.orderHistory.paging,
            orderHistory: action.orderHistory.results.map((_order) => ({
              orderId: _order.id,
              orderNumber: _order.orderNumber,
              orderDateTime: moment
                .utc(_order.orderDate)
                .local()
                .format('hh:mm A, MM-DD-YYYY'),
              orderStatus: _order.status,
              itemCount: _order.order_details.length,
              progressImage: progressImage[_order.status],
              progressColor: progressColor[_order.status],
              progressCount: progressCount[_order.status],
              serviceCharges: `$${_order.totalAmount}`,
            })),
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case FETCH_ALL_ACTIVE_ORDERS:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ALL_ACTIVE_ORDERS_SUCCESS:
      if (isUndefined(action.allActiveOrders)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            allActiveOrders: action.allActiveOrders.map((_order) => ({
              orderId: _order.id,
              orderNumber: _order.orderNumber,
              orderDateTime: moment
                .utc(_order.orderDate)
                .local()
                .format('hh:mm A, MM-DD-YYYY'),
              orderStatus: _order.status,
              itemCount: _order.order_details.length,
              progressImage: progressImage[_order.status],
              progressColor: progressColor[_order.status],
              progressCount: progressCount[_order.status],
              serviceCharges: `$${_order.totalAmount}`,
            })),
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case FETCH_ORDER_BY_ID:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ORDER_BY_ID_SUCCESS:
      if (isUndefined(action.orderById)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            orderById: action.orderById,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case FETCH_ALL_DRIVER_TASKS:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ALL_DRIVER_TASKS_SUCCESS:
      if (isUndefined(action.driverTasks)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            driverTasks: action.driverTasks,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case HIDE_LOADER:
      return state.merge({meta: {loading: false, loaded: true}}, {deep: true});
    default:
      return state;
  }
};

export default order;
