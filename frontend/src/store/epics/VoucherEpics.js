import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { VoucherTypes } from '../action-types/VoucherTypes';
import { toast } from 'react-toastify';
import { VoucherActions } from '../actions/VoucherActions';
const ErrorMsg = 'something went wrong !';

export class VoucherEpics {
    static getVouchers(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(VoucherTypes.GET_VOUCHERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Coupon/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[code%2BcouponType%2BofferType]=${payload.search}`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: VoucherTypes.GET_VOUCHERS_SUCC,
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
                        return of({ type: VoucherTypes.GET_VOUCHERS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static addVoucher(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(VoucherTypes.ADD_VOUCHER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Coupon/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('voucher added successfully');
                if (payload?.history) {
                    payload.history.goBack();
                }
                return of({
                    type: VoucherTypes.ADD_VOUCHER_SUCC,
                    payload: obj
                },
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
                        return of({ type: VoucherTypes.ADD_VOUCHER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editVoucher(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(VoucherTypes.EDIT_VOUCHER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Coupon/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('voucher edited successfully');
                if (payload?.history) {
                    payload.history.goBack();
                }
                return of({
                    type: VoucherTypes.EDIT_VOUCHER_SUCC,
                    payload: obj
                },
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
                        return of({ type: VoucherTypes.EDIT_VOUCHER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delVoucher(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(VoucherTypes.DEL_VOUCHER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Coupon/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('voucher deleted successfully');
                return of({
                    type: VoucherTypes.DEL_VOUCHER_SUCC,
                    payload: obj
                },
                    VoucherActions.getVouchers(state$.value.voucher.paging.pageNumber),
                    VoucherActions.toggleDelVoucherModal()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: VoucherTypes.DEL_VOUCHER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}