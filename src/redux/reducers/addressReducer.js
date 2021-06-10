import {
  FETCH_USER_ADDRESS,
  FETCH_USER_ADDRESS_SUCCESS,
  HIDE_LOADER,
} from '../actions/types';
import SeamlessImmutable from 'seamless-immutable';
import {isUndefined} from 'lodash';

const INITIAL_STATE = SeamlessImmutable({
  address: [],
  meta: {loading: false, loaded: false},
});

const address = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_ADDRESS:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_USER_ADDRESS_SUCCESS:
      if (isUndefined(action.address)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            address: action.address,
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

export default address;
