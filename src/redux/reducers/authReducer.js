import {
  SIGN_IN,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  LOADER,
  DRIVER_SIGN_UP,
  DRIVER_SIGN_UP_SUCCESS,
  SIGN_OUT,
  DRIVER_SIGN_IN,
  DRIVER_SIGN_IN_SUCCESS,
} from '../actions/types';
import SeamlessImmutable from 'seamless-immutable';

const INITIAL_STATE = SeamlessImmutable({
  access_token: null,
  meta: {authLoading: false, authLoaded: false},
});

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return state.merge(
        {
          meta: {authLoaded: false, authLoading: true},
        },
        {deep: true},
      );
    case SIGN_IN_SUCCESS:
      return state.merge(
        {
          meta: {authLoading: false, authLoaded: true},
          access_token: action.access_token,
        },
        {deep: true},
      );
    case SIGN_UP:
      return state.merge(
        {
          meta: {authLoaded: false, authLoading: true},
        },
        {deep: true},
      );
    case SIGN_UP_SUCCESS:
      return state.merge(
        {
          meta: {authLoading: false, authLoaded: true},
        },
        {deep: true},
      );
    case DRIVER_SIGN_UP:
      return state.merge(
        {
          meta: {authLoaded: false, authLoading: true},
        },
        {deep: true},
      );
    case DRIVER_SIGN_UP_SUCCESS:
      return state.merge(
        {
          meta: {authLoading: false, authLoaded: true},
        },
        {deep: true},
      );
    case FORGOT_PASSWORD:
      return state.merge(
        {
          meta: {authLoaded: false, authLoading: true},
        },
        {deep: true},
      );
    case FORGOT_PASSWORD_SUCCESS:
      return state.merge(
        {
          meta: {authLoading: false, authLoaded: true},
        },
        {deep: true},
      );
    case LOADER:
      return state.merge(
        {meta: {authLoading: false, authLoaded: true}},
        {deep: true},
      );

    case DRIVER_SIGN_IN:
      return state.merge(
        {
          meta: {authLoaded: false, authLoading: true},
        },
        {deep: true},
      );
    case DRIVER_SIGN_IN_SUCCESS:
      return state.merge(
        {
          meta: {authLoading: false, authLoaded: true},
          access_token: action.access_token,
        },
        {deep: true},
      );

    default:
      return state;
  }
};

export default auth;
