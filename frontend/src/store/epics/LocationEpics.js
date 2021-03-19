import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { LocationTypes } from '../action-types/LocationTypes';
import { toast } from 'react-toastify';
import { LocationActions } from '../actions/LocationActions';
const ErrorMsg = 'something went wrong !';

export class LocationEpics {
    static getLocations(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(LocationTypes.GET_LOCATIONS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Location/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[name%2BpostalCode]=${payload.search}`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: LocationTypes.GET_LOCATIONS_SUCC,
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
                        return of({ type: LocationTypes.GET_LOCATIONS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static addLocation(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(LocationTypes.ADD_LOCATION_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Location/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('location added successfully');
                return of({
                    type: LocationTypes.ADD_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleAddLocationModal(),
                    LocationActions.getLocations()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message;
                        if (err.status === 500)
                            message = err?.response?.Message;
                        else if (err.status === 400)
                            message = err?.response?.errors[0]?.message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: LocationTypes.ADD_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editLocation(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(LocationTypes.EDIT_LOCATION_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Location/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('location edited successfully');
                return of({
                    type: LocationTypes.EDIT_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleEditLocationModal(),
                    LocationActions.getLocations(state$.value.location.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message;
                        if (err.status === 500)
                            message = err?.response?.Message;
                        else if (err.status === 400)
                            message = err?.response?.errors[0]?.message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: LocationTypes.EDIT_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delLocation(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(LocationTypes.DEL_LOCATION_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Location/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('location deleted successfully');
                return of({
                    type: LocationTypes.DEL_LOCATION_SUCC,
                    payload: obj
                },
                    LocationActions.toggleDelLocationModal(),
                    LocationActions.getLocations(state$.value.location.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: LocationTypes.DEL_LOCATION_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}