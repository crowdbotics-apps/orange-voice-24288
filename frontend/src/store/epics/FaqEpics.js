import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { FaqTypes } from '../action-types/FaqTypes';
import { toast } from 'react-toastify';
import { FaqActions } from '../actions/FaqActions';
const ErrorMsg = 'something went wrong !';

export class FaqEpics {
    static getFaqs(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(FaqTypes.GET_FAQS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/FAQ/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[question%2Banswer]=${payload.search}`);
            })
                .pipe(pluck('response'), map(obj => {
                    return {
                        type: FaqTypes.GET_FAQS_SUCC,
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
                            return of({ type: FaqTypes.GET_FAQS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                        }
                    }));

        }));
    }

    static addFaq(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(FaqTypes.ADD_FAQ_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/FAQ/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq added successfully');
                return of({
                    type: FaqTypes.ADD_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleAddFaqModal(),
                    FaqActions.getFaqs()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: FaqTypes.ADD_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editFaq(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(FaqTypes.EDIT_FAQ_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/FAQ/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq edited successfully');
                return of({
                    type: FaqTypes.EDIT_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleEditFaqModal(),
                    FaqActions.getFaqs(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: FaqTypes.EDIT_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delFaq(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(FaqTypes.DEL_FAQ_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/FAQ/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('faq deleted successfully');
                return of({
                    type: FaqTypes.DEL_FAQ_SUCC,
                    payload: obj
                },
                    FaqActions.toggleDelFaqModal(),
                    FaqActions.getFaqs(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: FaqTypes.DEL_FAQ_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}