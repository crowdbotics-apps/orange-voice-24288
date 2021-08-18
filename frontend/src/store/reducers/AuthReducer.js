import {AuthTypes} from '../action-types/AuthTypes';
import {StripeTypes} from '../action-types/StripeTypes'

let INITIAL_STATE = {
  isProgress: false,
  isProgressList: false,
  isProgressRefreshToken: false,
  isError: false,
  errorText: '',
  errorStatus: 0,
  user: {},
  users: [],
  paging: {},
  stripeConnecting: false
};

export function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthTypes.SIGNIN_PROG:
      return {...state, isProgress: true};

    case AuthTypes.SIGNIN_SUCC:
      return {...state, isProgress: false, user: action.payload.user};

    case AuthTypes.PROFILE_EDIT_PROG:
      return {...state, isProgress: true};

    case AuthTypes.PROFILE_EDIT_SUCC:
      return {
        ...state,
        isProgress: false,
        user: {...state.user, profile: action.payload},
      };
    
    case AuthTypes.PROFILE_EDIT_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,

      }

    case StripeTypes.STRIPE_CONNECT:
      return {...state, stripeConnecting: true};

    case StripeTypes.STRIPE_CONNECT_SUCCESS:
      return {
        ...state,
        stripeConnecting: false,
        user: {...state.user, profile: action.payload},
      };
    
    case StripeTypes.STRIPE_CONNECT_FAIL:
      return {
        ...state,
        stripeConnecting: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,

      }

    case AuthTypes.SIGNIN_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AuthTypes.RESET_PASSWORD_PROG:
      return {...state, isProgress: true};

    case AuthTypes.RESET_PASSWORD_SUCC:
      return {...state, isProgress: false};

    case AuthTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AuthTypes.SIGNUP_PROG:
      return {...state, isProgress: true};

    case AuthTypes.SIGNUP_SUCC:
      return {...state, isProgress: false, user: action.payload.user};

    case AuthTypes.GET_ALL_USERS_PROG:
      return {...state, isProgressList: true};

    case AuthTypes.GET_ALL_USERS_SUCC:
      return {
        ...state,
        isProgressList: false,
        users: action.payload.results,
        paging: action.payload,
      };

    case AuthTypes.GET_ALL_USERS_FAIL:
      return {
        ...state,
        isProgressList: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AuthTypes.GET_NEW_ACCESS_TOKEN_PROG:
      return {...state, isProgressRefreshToken: true};

    case AuthTypes.GET_NEW_ACCESS_TOKEN_SUCC:
      return {...state, isProgressRefreshToken: false};

    case AuthTypes.GET_NEW_ACCESS_TOKEN_FAIL:
      return {
        ...state,
        isProgressRefreshToken: false,
        isError: true,
        errorMsg: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AuthTypes.SET_USER:
      return {...state, user: action.payload.user};

    case AuthTypes.CLEAR_ERROR:
      return {...state, isError: false, errorText: '', errorStatus: 0};
    default:
      return state;
  }
}
