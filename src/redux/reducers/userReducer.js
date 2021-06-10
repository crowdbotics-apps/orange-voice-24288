import {
  FETCH_USER_PROFILE,
  RESET_USER_PASSWORD,
  FETCH_USER_PROFILE_SUCCESS,
  HIDE_LOADER,
} from '../actions/types';
import SeamlessImmutable from 'seamless-immutable';
import {isUndefined} from 'lodash';

const INITIAL_STATE = SeamlessImmutable({
  user: {},
  meta: {loading: false, loaded: false},
});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_USER_PROFILE_SUCCESS:
      if (isUndefined(action.user)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            user: action.user,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case RESET_USER_PASSWORD:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case HIDE_LOADER:
      return state.merge({meta: {loading: false, loaded: true}}, {deep: true});

    default:
      return state;
  }
};

export default user;
