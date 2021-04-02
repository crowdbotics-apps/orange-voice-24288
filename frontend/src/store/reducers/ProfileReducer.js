import {ProfileTypes} from '../action-types/ProfileTypes';

let INITIAL_STATE = {
  isProgress: false,
  isError: false,
  errorText: '',
  errorStatus: 0,
  profile: {},
};

export function profileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ProfileTypes.PROFILE_EDIT_PROG:
      return {...state, isProgress: true};

    case ProfileTypes.PROFILE_EDIT_SUCC:
      return {...state, isProgress: false, profile: action.payload};

    case ProfileTypes.PROFILE_EDIT_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload.message,
        errorStatus: action.payload.status,
      };

    default:
      return state
  }
}
