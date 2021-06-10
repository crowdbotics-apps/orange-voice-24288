import allActions from '../actions/index';
import {put, call, takeLatest} from 'redux-saga/effects';
import {
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_SERVICES,
  FETCH_ALL_FAQS,
  FETCH_FAQS_BY_ID,
  FETCH_ALL_LOVS,
} from '../actions/types';
import allAPIServices from '../services/index';

/**
 ******** FUNCTION ************
 */

export function* fetchAllCategories(action) {
  try {
    const response = yield call(allAPIServices.productsApi.allCategories);
    yield put(
      allActions.productActions.fetchAllCategoriesSuccess({
        categories: response.data.results,
        paging: response.data.paging,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.productActions.hideLoader());
  }
}

export function* fetchAllLOVs(action) {
  try {
    const response = yield call(allAPIServices.productsApi.getLovs);
    const result = response.data.results || [];
    const systemArray = result.filter((item) => item.groupName === 'System');
    const timeSlots = result.filter((item) => item.groupName === 'TimeSlot');
    const systemKeys = {};

    for (let i = 0; i < systemArray.length; i++) {
      const item = systemArray[i];
      systemKeys[item.key] = item.value;
    }

    yield put(
      allActions.productActions.fetchAllLovsSuccess({
        timeslots: timeSlots,
        config: systemKeys,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.productActions.hideLoader());
  }
}

export function* fetchAllServices(action) {
  try {
    const response = yield call(
      allAPIServices.productsApi.allServices,
      action.params,
    );
    yield put(
      allActions.productActions.fetchAllServicesSuccess({
        services: response.data.results,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.productActions.hideLoader());
  }
}

export function* fetchAllFAQs(action) {
  try {
    const response = yield call(allAPIServices.productsApi.getAllFAQs);
    yield put(
      allActions.productActions.fetchAllFAQsSuccess({
        faqs: response.data.results,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.productActions.hideLoader());
  }
}

export function* fetchFAQsById(action) {
  try {
    const response = yield call(
      allAPIServices.productsApi.getFAQsById,
      action.params,
    );
    yield put(
      allActions.productActions.fetchAllFAQsSuccess({
        faqs: response.data.results,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.productActions.hideLoader());
  }
}

/**
 ************ WATCHER**********
 */

export function* watchFetchAllCategories() {
  yield takeLatest(FETCH_ALL_CATEGORIES, fetchAllCategories);
}

export function* watchFetchAllLovs() {
  yield takeLatest(FETCH_ALL_LOVS, fetchAllLOVs);
}

export function* watchFetchAllServices() {
  yield takeLatest(FETCH_ALL_SERVICES, fetchAllServices);
}

export function* watchFetchAllFAQs() {
  yield takeLatest(FETCH_ALL_FAQS, fetchAllFAQs);
}

export function* watchFetchFAQsById() {
  yield takeLatest(FETCH_FAQS_BY_ID, fetchFAQsById);
}
