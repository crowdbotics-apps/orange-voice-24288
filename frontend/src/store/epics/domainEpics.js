import {of, defer} from 'rxjs';
import {ofType} from 'redux-observable';
import {switchMap, pluck, catchError, map, flatMap} from 'rxjs/operators';

import {DomainTypes} from '../action-types/DomainTypes';
import {toast} from 'react-toastify';
const ErrorMsg = 'something went wrong!';

export class DomainEpics {
  static editDomain(action$, state$, {ajaxPut}) {
    return action$.pipe(
      ofType(DomainTypes.ADD_DOMAIN_PROG),
      switchMap(({payload}) => {
        return defer(() => {
          return ajaxPut(
            `api/v1/domain/${state$.value.auth.user.domain}/`,
            payload.body,
          );
        }).pipe(
          pluck('response'),
          flatMap((obj) => {
            toast.success('Domain saved successfully');
            return of({
              type: DomainTypes.ADD_DOMAIN_SUCC,
              payload: obj,
            });
          }),
          catchError((err, source) => {
            let message;
              message = err?.response?.message;
            toast.error(message ? message : ErrorMsg);
            return of({
              type: DomainTypes.ADD_DOMAIN_FAIL,
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

  static getDomain(action$, state$, {ajaxGet}) {
    return action$.pipe(
      ofType(DomainTypes.GET_DOMAIN_PROG),
      switchMap(({paylaod}) => {
        return defer(() => {
          return ajaxGet(`api/v1/domain/${state$.value.auth.user.domain}/`);
        }).pipe(
          pluck('response'),
          map((obj) => {
            return {
              type: DomainTypes.GET_DOMAIN_SUCC,
              payload: obj,
            };
          }),
          catchError((err, source) => {
            let message = err?.response?.Message;
            toast.error(message ? message : ErrorMsg);
            return of({
              type: DomainTypes.GET_DOMAIN_FAIL,
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
