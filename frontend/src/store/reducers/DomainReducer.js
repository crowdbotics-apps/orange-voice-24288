import {DomainTypes} from '../action-types/DomainTypes';

let INITIAL_STATE = {
  isProgress: false,
  domain: {},
  isError: false,
  errorText: '',
  errorStatus: 0,
};

export function domainReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DomainTypes.GET_DOMAIN_PROG:
      return {...state, isProgress: true, domain: {}};

    case DomainTypes.GET_DOMAIN_SUCC:
      return {...state, isProgress: false, domain: action.payload};
    case DomainTypes.GET_DOMAIN_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,
      };

    case DomainTypes.ADD_DOMAIN_PROG:
      return {...state, isProgress: true};
    case DomainTypes.ADD_DOMAIN_SUCC:
      return {...state, isProgress: false};

    default:
      return state;
  }
}
