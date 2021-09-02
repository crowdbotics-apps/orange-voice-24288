import {TimeSlotTypes} from '../action-types/TimeSlotTypes';

export class TimeSlotActions {
  static getTimeSlots() {
    return {
      type: TimeSlotTypes.GET_TIME_SLOTS_PROG,
      payload: {},
    };
  }

  static editTimeSlots(body) {
    return {
      type: TimeSlotTypes.EDIT_TIME_SLOT_PROG,
      payload: {body},
    };
  }
}
