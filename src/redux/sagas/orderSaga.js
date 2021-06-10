import {put, takeLatest, call} from 'redux-saga/effects';
import storage from '../utils/storage';
import allAPIServices from '../services/index';
import allActions from '../actions';
import {
  PLACE_ORDER_DETAILS,
  FETCH_ORDER_DETAILS,
  FETCH_ALL_ORDERS,
  FETCH_ORDER_HISTORY,
  FETCH_ORDER_BY_ID,
  SAVE_USER_ORDER,
  CANCEL_ORDER,
  MAKE_ORDER_PAYMENT,
  FETCH_ALL_ACTIVE_ORDERS,
  UPDATE_SAVED_USER_ORDER,
  FETCH_ALL_DRIVER_TASKS,
  UPDATE_ORDER_STATUS,
  VALIDATE_ORDER_TIME_SLOT,
  NOTIFY_USER,
} from '../actions/types';

/**
 ******** FUNCTION ************
 */

export function* orderDetails({order, onSuccess, onFail}) {
  try {
    yield call(storage.saveOrderDetails, order);
    onSuccess && onSuccess();
  } catch (ex) {
    onFail && onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* validateOrderTimeSlotSaga(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.validateOrderTimeSlot,
      action.params,
    );
    action.onSuccess && action.onSuccess(response);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchOrderDetails({onSuccess, onFail}) {
  try {
    yield put(
      allActions.orderActions.fetchOrderDetailsSuccess({
        orderDetails: yield call(storage.getOrderDetails),
      }),
    );
    onSuccess && onSuccess();
  } catch (ex) {
    onFail && onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchAllOrders(action) {
  try {
    const response = yield call(allAPIServices.orderApi.getAllOrders);
    yield put(
      allActions.orderActions.fetchAllOrdersSuccess({
        allOrders: response.data.results,
        paging: response.data,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchAllActiveOrders(action) {
  try {
    const response = yield call(allAPIServices.orderApi.getAllActiveOrders);
    yield put(
      allActions.orderActions.fetchAllActiveOrdersSuccess({
        allActiveOrders: response.data.results,
        paging: response.data,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchOrderHistory(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.getOrderHistory,
      action.params || {},
    );
    yield put(
      allActions.orderActions.fetchOrderHistorySuccess({
        orderHistory: response.data,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchOrderById(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.getOrderById,
      action.params,
    );
    yield put(
      allActions.orderActions.fetchOrderByIdSuccess({
        orderById: response.data,
      }),
    );
    action.onSuccess && action.onSuccess(response.data);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* saveUserOrder(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.postOrderCheckout,
      action.params,
    );
    action.onSuccess && action.onSuccess(response.data);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* updateSavedUserOrder(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.updateOrderCheckout,
      action.params,
    );
    action.onSuccess && action.onSuccess(response.data);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* cancelOrder(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.cancelOrder,
      action.params,
    );
    action.onSuccess && action.onSuccess(response.data.results);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* makeOrderPayment(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.makeOrderPayment,
      action.params,
    );
    action.onSuccess && action.onSuccess(response.data.results);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* updateOrderStatus(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.updateOrderStatus,
      action.params,
    );
    action.onSuccess && action.onSuccess(response.data.results);
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* fetchAllDriverTasks(action) {
  try {
    const response = yield call(
      allAPIServices.orderApi.getAllDriverTasks,
      action.params,
    );
    yield put(
      allActions.orderActions.fetchAllDriverTasksSuccess({
        driverTasks: response.data.results.filter(
          (item) => item.status === 'PickUp' || item.status === 'DropOff',
        ),
        paging: response.data.paging,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

export function* notifyUserProgress(action) {
  try {
    yield call(allAPIServices.orderApi.notifyUser, action.params);
    action.onSuccess && action.onSuccess();
  } catch (ex) {
    action.onFail && action.onFail(ex);
  } finally {
    yield put(allActions.orderActions.hideLoader());
  }
}

/**
 ************ WATCHER**********
 */

export function* watchOrderDetails() {
  yield takeLatest(PLACE_ORDER_DETAILS, orderDetails);
}

export function* watchFetchOrderDetails() {
  yield takeLatest(FETCH_ORDER_DETAILS, fetchOrderDetails);
}

export function* watchFetchAllOrders() {
  yield takeLatest(FETCH_ALL_ORDERS, fetchAllOrders);
}

export function* watchFetchAllAcitveOrders() {
  yield takeLatest(FETCH_ALL_ACTIVE_ORDERS, fetchAllActiveOrders);
}

export function* watchFetchOrderHistory() {
  yield takeLatest(FETCH_ORDER_HISTORY, fetchOrderHistory);
}
export function* watchFetchOrderById() {
  yield takeLatest(FETCH_ORDER_BY_ID, fetchOrderById);
}

export function* watchSaveUserOrder() {
  yield takeLatest(SAVE_USER_ORDER, saveUserOrder);
}

export function* watchUpdateSavedUserOrder() {
  yield takeLatest(UPDATE_SAVED_USER_ORDER, updateSavedUserOrder);
}

export function* watchCancelOrder() {
  yield takeLatest(CANCEL_ORDER, cancelOrder);
}

export function* watchMakeOrderPayment() {
  yield takeLatest(MAKE_ORDER_PAYMENT, makeOrderPayment);
}

export function* watchFetchAllDriverTasks() {
  yield takeLatest(FETCH_ALL_DRIVER_TASKS, fetchAllDriverTasks);
}

export function* watchUpdateTaskStatus() {
  yield takeLatest(UPDATE_ORDER_STATUS, updateOrderStatus);
}

export function* watchValidateOrderTimeSlot() {
  yield takeLatest(VALIDATE_ORDER_TIME_SLOT, validateOrderTimeSlotSaga);
}

export function* watchNotifyUserProgress() {
  yield takeLatest(NOTIFY_USER, notifyUserProgress);
}
