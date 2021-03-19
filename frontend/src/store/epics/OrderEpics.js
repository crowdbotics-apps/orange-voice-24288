import { of, defer, iif } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { OrderTypes } from '../action-types/OrderTypes';
import { toast } from 'react-toastify';
import { OrderActions } from '../actions/OrderActions';
const ErrorMsg = 'something went wrong !';

export class OrderEpics {
    static getOrders(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_ORDERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                let url = `/Order/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[status]=${payload.status}&filters[orderNumber%2BdeliveryAddress%2BfirstName%2BlastName%2Bemail]=${payload.search}&sort=-orderDate`;
                if (payload.orderDate) {
                    let dateFilter = `&filters[>%3DpickupDate]=${payload.orderDate['startDate']}&filters[<%3DpickupDate]=${payload.orderDate['endDate']}`;
                    url = url.concat(dateFilter);
                }
                return ajaxGet(url);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: OrderTypes.GET_ORDERS_SUCC,
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
                        return of({ type: OrderTypes.GET_ORDERS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static postOrder(action$, state$, { ajaxPost, history, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.POST_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/order', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                window.scrollTo(0, 0);
                history.replace('/admin/customers');
                toast.success('Order placed successfully');
                return of(
                    {
                        type: OrderTypes.POST_ORDER_SUCC,
                        payload: { order: obj.result }
                    },
                    // NotificationActions.showSuccessNotification('Order placed successfully'),
                    // MyBasketActions.clearBasket()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        toast.error(err?.message || err?.Message || ErrorMsg);
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderTypes.POST_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        );
                    }
                }));

        }));
    }




    static getLov(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_LOV_PROG), switchMap(() => {
            return defer(() => {
                return ajaxGet('/lov/all/');
            }).pipe(pluck('response'), flatMap(obj => {

                let config = {
                    system: {},
                    timeSlots: []
                };
                let timeSlots = [];
                obj.result.forEach((v) => {
                    let groupName = v['groupName'];
                    if (groupName === 'System') {
                        let system = v;
                        config['system'][system['key']] = system['value'];
                    }
                    else if (groupName === 'TimeSlot') {
                        let timeSlot = v;
                        timeSlots.push(timeSlot);
                    }
                });
                config['timeSlots'] = timeSlots;
                return of({ type: OrderTypes.GET_LOV_SUCC, payload: { config } });
            }), catchError((err, source) => {
                if (err.status === 401) {
                    return getRefreshToken(action$, state$, source);
                }
                else {

                    return of({ type: OrderTypes.GET_LOV_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }
            }));

        }));
    }

    static getAddresses(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_ADDRESSES_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Address/all?filters[userId]=${payload.userId}`);
            }).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: OrderTypes.GET_ADDRESSES_SUCC,
                        payload: { addresses: obj.result }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: OrderTypes.GET_ADDRESSES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },

                        );
                    }
                }));

        }));
    }


    static getCSVData(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_CSV_DATA_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Order/all?page[number]=1&page[size]=5000&filters[status]=${payload.status}&sort=-orderDate`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: OrderTypes.GET_CSV_DATA_SUCC,
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
                        return of({ type: OrderTypes.GET_CSV_DATA_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }


    static getOrder(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.GET_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Order/${payload.orderId}`);
            }).pipe(pluck('response'), flatMap(obj => {
                return iif(
                    () => payload?.openPdf,
                    of(
                        {
                            type: OrderTypes.GET_ORDER_SUCC,
                            payload: obj
                        },
                        OrderActions.togglePdfOrderModal()
                    ),
                    of(
                        {
                            type: OrderTypes.GET_ORDER_SUCC,
                            payload: obj
                        },
                        OrderActions.toggleEditOrderModal()
                    )
                );

            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.GET_ORDER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static updateOrderStatus(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.UPDATE_ORDER_STATUS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order/status', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('status updated successfully');
                return of({
                    type: OrderTypes.UPDATE_ORDER_STATUS_SUCC,
                    payload: obj
                },
                    OrderActions.toggleStatusModal(),
                    OrderActions.getOrders(state$?.value?.order?.paging?.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.UPDATE_ORDER_STATUS_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static cancelOrder(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.CANCEL_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut(`/Order/cancel/${payload.id}`);
            }).pipe(pluck('response'), flatMap(() => {
                toast.success('Order cancelled successfully');
                return of(
                    {
                        type: OrderTypes.CANCEL_ORDER_SUCC,
                    },
                    OrderActions.toggleStatusModal(),
                    OrderActions.getOrders(state$?.value?.order?.paging?.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        toast.error(err?.message || err?.Message);
                        return of({ type: OrderTypes.CANCEL_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                    }
                }));

        }));
    }


    static editOrder(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.EDIT_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order/', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('Order updated successfully');
                return of({
                    type: OrderTypes.EDIT_ORDER_SUCC,
                    payload: obj
                },
                    OrderActions.toggleEditOrderModal(),
                    OrderActions.getOrders(state$?.value?.category?.paging?.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message;
                        message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: OrderTypes.EDIT_ORDER_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static checkSelectedPickupSlot(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.CHECK_SELECTED_PICKUP_SLOT_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Order/validatetimeslot', payload.body);
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: OrderTypes.CHECK_SELECTED_PICKUP_SLOT_SUCC,
                        payload: obj
                    }
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderTypes.CHECK_SELECTED_PICKUP_SLOT_FAIL, payload: { err, message: err?.response?.message || err?.response?.Message, status: err?.status } }
                        );
                    }
                }));

        }));
    }
    static checkSelectedDropoffSlot(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Order/validatetimeslot', payload.body);
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_SUCC,
                        payload: obj
                    }
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_FAIL, payload: { err, message: err?.response?.message || err?.response?.Message, status: err?.status } }
                        );
                    }
                }));

        }));
    }

}