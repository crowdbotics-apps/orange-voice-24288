import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';

import { CategoryTypes } from '../action-types/CategoryTypes';
import { toast } from 'react-toastify';
import { CategoryActions } from '../actions/CategoryActions';
const ErrorMsg = 'something went wrong !';

export class CategoryEpics {
    static getCategories(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(CategoryTypes.GET_CATEGORIES_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/Category/all?page[number]=${payload?.page}&page[size]=${payload?.pageSize}&filters[title]=${payload.search}`);
            }).pipe(pluck('response'), map(obj => {
                return {
                    type: CategoryTypes.GET_CATEGORIES_SUCC,
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
                        return of({ type: CategoryTypes.GET_CATEGORIES_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }

    static addCateogry(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(CategoryTypes.ADD_CATEGORY_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Category/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('category added successfully');
                return of({
                    type: CategoryTypes.ADD_CATEGORY_SUCC,
                    payload: obj
                },
                    CategoryActions.toggleAddCategoryModal(),
                    CategoryActions.getCategories()
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
                        return of({ type: CategoryTypes.ADD_CATEGORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static editCateogry(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(CategoryTypes.EDIT_CATEGORY_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Category/', payload.body, null);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('category edited successfully');
                return of({
                    type: CategoryTypes.EDIT_CATEGORY_SUCC,
                    payload: obj
                },
                    CategoryActions.toggleEditCategoryModal(),
                    CategoryActions.getCategories(state$.value.category.paging.pageNumber)
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
                        return of({ type: CategoryTypes.EDIT_CATEGORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
    static delCateogry(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(CategoryTypes.DEL_CATEGORY_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Category/${payload.id}`);
            }).pipe(pluck('response'), flatMap(obj => {
                toast.success('category deleted successfully');
                return of({
                    type: CategoryTypes.DEL_CATEGORY_SUCC,
                    payload: obj
                },
                    CategoryActions.toggleDelCategoryModal(),
                    CategoryActions.getCategories(state$.value.category.paging.pageNumber)
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        let message = err?.response?.Message;
                        toast.error(message ? message : ErrorMsg);
                        return of({ type: CategoryTypes.DEL_CATEGORY_FAIL, payload: { err, message: message ? message : ErrorMsg, status: err?.status } });
                    }
                }));

        }));
    }
}