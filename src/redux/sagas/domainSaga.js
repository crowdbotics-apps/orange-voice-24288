import {call, put, takeLatest} from 'redux-saga/effects';
import allActions from '../actions';
import {FETCH_DOMAIN} from '../actions/types';
import allAPIServices from '../services';

export function* fetchDomain({onSuccess, onFail}) {
  try {
    const res = yield call(allAPIServices.domainApi.getDomainById);
    yield put(
      allActions.domainActions.fetchDomainSuccess({
        payload: res.data,
      }),
    );
    onSuccess && onSuccess(res.data);
  } catch (error) {
    onFail && onFail(error);
  } finally {
  }
}

export function* watchFetchDomain() {
  yield takeLatest(FETCH_DOMAIN, fetchDomain);
}
