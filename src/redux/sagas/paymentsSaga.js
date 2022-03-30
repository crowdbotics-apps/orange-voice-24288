import allActions from '../actions/index';
import {put, call, takeLatest} from 'redux-saga/effects';
import {FETCH_ALL_CARDS, ADD_CARD, DELETE_CARD} from '../actions/types';
import allAPIServices from '../services/index';

/**
 ******** FUNCTION ************
 */

export function* fetchAllCards(action) {
  try {
    const response = yield call(allAPIServices.paymentApi.allCards);
    yield put(
      allActions.paymentActions.fetchAllCardsSuccess({
        cards: response.data.results,
        paging: response.data.paging,
      }),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* addCard(action) {
  try {
    const response = yield call(
      allAPIServices.paymentApi.addCard,
      action.params,
    );
    yield put(allActions.paymentActions.addCardSuccess({}));
    action.onSuccess && action.onSuccess(response.data);
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

export function* deleteCard(action) {
  try {
    yield call(allAPIServices.paymentApi.deleteCard, action.params);
    yield put(
      allActions.paymentActions.deleteCardSuccess({id: action.params.id}),
    );
    action.onSuccess && action.onSuccess();
  } catch (error) {
    action.onFail && action.onFail(error);
  } finally {
    yield put(allActions.authActions.hideLoader());
  }
}

/**
 ************ WATCHER**********
 */

export function* watchFetchAllCards() {
  yield takeLatest(FETCH_ALL_CARDS, fetchAllCards);
}

export function* watchAddCard() {
  yield takeLatest(ADD_CARD, addCard);
}

export function* watchDeleteCard() {
  yield takeLatest(DELETE_CARD, deleteCard);
}
