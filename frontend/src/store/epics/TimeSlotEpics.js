import {of, defer} from 'rxjs';
import {ofType} from 'redux-observable';
import {switchMap, pluck, catchError, map, flatMap} from 'rxjs/operators';

import {TimeSlotTypes} from '../action-types/TimeSlotTypes';
import {toast} from 'react-toastify';

const ErrorMsg = 'something went wrong!';

export class TimeSlotEpics {
  static editTimeSlots(action$, state$, {ajaxPost, getRefreshToken}) {
    return action$.pipe(
      ofType(TimeSlotTypes.EDIT_TIME_SLOT_PROG),
      switchMap(({payload}) => {
        return defer(() => {
          return ajaxPost(
            `api/v1/${state$.value.auth.user.domain}/bulk-timeslots/`,
            payload.body,
          );
        }).pipe(
          pluck('response'),
          flatMap((obj) => {
            toast.success('Time slots saved successfully');
            return of({
              type: TimeSlotTypes.EDIT_TIME_SLOT_SUCC,
              payload: obj,
            });
          }),
          catchError((err, source) => {
            let message;
            if (err.status === 500) message = err?.response?.Message;
            else if (err.status === 400)
              message = err?.response?.errors[0]?.message;
            toast.error(message ? message : ErrorMsg);
            return of({
              type: TimeSlotTypes.GET_TIME_SLOTS_FAIL,
              payload: {
                err,
                message: message ? message : ErrorMsg,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }

  static getTimeSlots(action$, state$, {ajaxGet}) {
    return action$.pipe(
      ofType(TimeSlotTypes.GET_TIME_SLOTS_PROG),
      switchMap(({paylaod}) => {
        return defer(() => {
          return ajaxGet(`api/v1/${state$.value.auth.user.domain}/timeslots/`);
        }).pipe(
          pluck('response'),
          map((obj) => {
            return {
              type: TimeSlotTypes.GET_TIME_SLOTS_SUCC,
              payload: obj.results,
            };
          }),
          catchError((err, source) => {
            let message = err?.response?.Message;
            toast.error(message ? message : ErrorMsg);
            return of({
              type: TimeSlotTypes.GET_TIME_SLOTS_FAIL,
              payload: {
                err,
                message: message ? message : ErrorMsg,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }
}
