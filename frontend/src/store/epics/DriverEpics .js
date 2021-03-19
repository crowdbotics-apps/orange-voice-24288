import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { DriverTypes } from '../action-types/DriverTypes';
import { toast } from 'react-toastify';
import { DriverActions } from '../actions/DriverActions';
const ErrorMsg = 'something went wrong !';

export class DriverEpics {
    static getDrivers(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(DriverTypes.GET_DRIVERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Driver/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[name%2BcontactNumber]=${payload.search}`);
            })
                .pipe(pluck('response'), map(obj => {
                    return {
                        type: DriverTypes.GET_DRIVERS_SUCC,
                        payload: obj
                    };
                })
                    , catchError((err, source) => {
                        if (err.status === 401) {
                            return getRefreshToken(action$, state$, source);
                        }
                        else {
                            let message = err?.response?.Message;
                            toast.error(message ? message : ErrorMsg);
                            return of({ type: DriverTypes.GET_DRIVERS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                        }
                    }));

        }));
    }

    static getDriverHistory(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(DriverTypes.GET_DRIVER_HISTORY_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/driver/${payload.driverId}/orders?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[name]=${payload.search}`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: DriverTypes.GET_DRIVER_HISTORY_SUCC,
                    payload: obj
                };
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: DriverTypes.GET_DRIVER_HISTORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static addDriver(action$, state$, { ajaxPost, getRefreshToken, history }) {
        return action$.pipe(ofType(DriverTypes.ADD_DRIVER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Driver/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('Driver added successfully');

                history.goBack();

                return of({
                    type: DriverTypes.ADD_DRIVER_SUCC,
                    payload: obj
                },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: DriverTypes.ADD_DRIVER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editDriver(action$, state$, { ajaxPut, getRefreshToken, history }) {
        return action$.pipe(ofType(DriverTypes.EDIT_DRIVER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Driver/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('Driver edited successfully');

                history.goBack();

                return of({
                    type: DriverTypes.EDIT_DRIVER_SUCC,
                    payload: obj
                },

                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: DriverTypes.EDIT_DRIVER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delDriver(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(DriverTypes.DEL_DRIVER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Driver/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('Driver deleted successfully');
                return of({
                    type: DriverTypes.DEL_DRIVER_SUCC,
                    payload: obj
                },
                    DriverActions.toggleDelDriverModal(),
                    DriverActions.getDrivers(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: DriverTypes.DEL_DRIVER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}