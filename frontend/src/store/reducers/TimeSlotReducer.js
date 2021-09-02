import {TimeSlotTypes} from '../action-types/TimeSlotTypes';

let INITIAL_STATE = {
  isProgress: false,
  isError: false,
  errorText: '',
  timeSlots: [],
};

export function timeSlotReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TimeSlotTypes.GET_TIME_SLOTS_PROG:
      return {...state, isProgress: true, timeSlots: []};
    case TimeSlotTypes.GET_TIME_SLOTS_SUCC:
      return {...state, isProgress: false, timeSlots: action.payload};
    case TimeSlotTypes.GET_TIME_SLOTS_FAIL:
      return {
        ...state,
        isProgress: false,
        isError: true,
        errorText: action.payload,
      };

    case TimeSlotTypes.EDIT_TIME_SLOT_PROG:
      return {...state, isProgress: true};
    case TimeSlotTypes.EDIT_TIME_SLOT_SUCC:
      return {...state, isProgress: false};

    default:
      return state;
  }
}
