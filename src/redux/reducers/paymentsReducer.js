import {
  FETCH_ALL_CARDS,
  ADD_CARD,
  DELETE_CARD,
  HIDE_LOADER,
  FETCH_ALL_CARDS_SUCCESS,
  ADD_CARD_SUCCESS,
  DELETE_CARD_SUCCESS
} from '../actions/types';

import SeamlessImmutable from 'seamless-immutable';
import { isUndefined } from 'lodash';

const INITIAL_STATE = SeamlessImmutable({
  cards: [],
  meta: { loading: false, loaded: false },
});

const payment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_CARDS:
      return state.merge(
        {
          meta: { loaded: false, loading: true },
        },
        { deep: true },
      );
    case DELETE_CARD_SUCCESS:
      return state.merge(
        {
          cards: state.cards.filter(c => c.cardId !== action.id),
          meta: { loaded: false, loading: false },
        },
        { deep: true },
      );
    case FETCH_ALL_CARDS_SUCCESS:
      if (isUndefined(action.cards)) {
        return state.merge(
          { meta: { loading: false, loaded: true } },
          { deep: true },
        );
      } else {
        return state.merge(
          {
            cards: action.cards,
            meta: { loading: false, loaded: true },
          },
          { deep: true },
        );
      }

    case HIDE_LOADER:
      return state.merge({ meta: { loading: false, loaded: true } }, { deep: true });

    default:
      return state;
  }
};

export default payment;