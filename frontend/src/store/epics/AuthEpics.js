import {of, defer} from 'rxjs';
import {ofType} from 'redux-observable';
import {switchMap, pluck, catchError, map, mergeMap} from 'rxjs/operators';
import {AuthTypes} from '../action-types/AuthTypes';
import {StorageService} from '../services/StorageService';
import {toast} from 'react-toastify';
import {AuthActions} from '../actions/AuthActions';
import {StripeTypes} from '../action-types/StripeTypes'
const ErrorMsg = 'something went wrong !';

export class AuthEpics {
  static signin(action$, state$, {ajaxPost}) {
    return action$.pipe(
      ofType(AuthTypes.SIGNIN_PROG),
      switchMap(({payload}) => {
        return ajaxPost('rest-auth/login', payload.body).pipe(
          pluck('response'),
          map((obj) => {
            let {
              id,
              domain,
              userName,
              firstName,
              lastName,
              role,
              token,
              refreshToken,
              profile
            } = obj;
            if (role === 'Admin') {
              let user = {id, domain, userName, firstName, lastName, role, profile};
              StorageService.setToken(token);
              StorageService.setRefreshToken(refreshToken);
              StorageService.setUser(user);
              return {
                type: AuthTypes.SIGNIN_SUCC,
                payload: {user},
              };
            } else {
              let err = new Error('You donot have sufficient rights');
              throw err;
            }
          }),
          catchError((err) => {
            let errText = '';
            for (const [key, value] of Object.entries(err?.response || {})) {
              errText += `${key.replace('non_field_errors', '')}: ${value}`;
            }
            return of({
              type: AuthTypes.SIGNIN_FAIL,
              payload: {
                message: errText,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }

  static resetPassword(action$, state$, {ajaxPost}) {
    return action$.pipe(
      ofType(AuthTypes.RESET_PASSWORD_PROG),
      switchMap(({payload}) => {
        return ajaxPost('rest-auth/password/reset/', payload.body).pipe(
          pluck('response'),
          map((obj) => {
            let {detail} = obj;
            toast.success(detail);
            return {
              type: AuthTypes.RESET_PASSWORD_SUCC,
              payload: {message: detail},
            };
          }),
          catchError((err) => {
            let errText = '';
            for (const [key, value] of Object.entries(err?.response)) {
              errText += `${key}: ${value?.email}`;
            }

            return of({
              type: AuthTypes.RESET_PASSWORD_FAIL,
              payload: {
                message: errText,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }

  static signup(action$, state$, {ajaxPost}) {
    return action$.pipe(
      ofType(AuthTypes.SIGNUP_PROG),
      switchMap(({payload}) => {
        return ajaxPost('rest-auth/registration/', payload.body).pipe(
          pluck('response'),
          map((obj) => {
            let {
              id,
              domain,
              userName,
              firstName,
              lastName,
              role,
              token,
              refreshToken,
              profile
            } = obj;
            if (role === 'Admin') {
              let user = {id, userName, firstName, lastName, role, domain, profile};
              StorageService.setToken(token);
              StorageService.setRefreshToken(refreshToken);
              StorageService.setUser(user);
              return {
                type: AuthTypes.SIGNIN_SUCC,
                payload: {user},
              };
            } else {
              let err = new Error('You do not have sufficient rights');
              throw err;
            }
          }),
          catchError((err) => {
            let errText = '';
            for (const [key, value] of Object.entries(err?.response)) {
              errText += `${key}: ${value}`;
            }
            return of({
              type: AuthTypes.SIGNIN_FAIL,
              payload: {
                message: errText,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }

  static getAllUsers(action$, state$, {ajaxGet, getRefreshToken}) {
    return action$.pipe(
      ofType(AuthTypes.GET_ALL_USERS_PROG),
      switchMap(({payload}) => {
        return defer(() => {
          return ajaxGet(
            `api/v1/${state$.value.auth.user.domain}/profile/?page=${payload?.page}&offset=${(payload?.page -1) * 10}&search=${payload.search}&type=customer&limit=10`,
          );
        }).pipe(
          pluck('response'),
          map((obj) => {
            return {
              type: AuthTypes.GET_ALL_USERS_SUCC,
              payload: obj,
            };
          }),
          catchError((err, source) => {
            if (err.status === 401) {
              return getRefreshToken(action$, state$, source);
            } else {
              let message = err?.response?.Message;
              toast.error(message ? message : ErrorMsg);
              return of({
                type: AuthTypes.GET_ALL_USERS_FAIL,
                payload: {
                  err,
                  message: message ? message : ErrorMsg,
                  status: err?.status,
                },
              });
            }
          }),
        );
      }),
    );
  }

  static getNewAccessToken(action$, state$, {ajaxPost, history}) {
    return action$.pipe(
      ofType(AuthTypes.GET_NEW_ACCESS_TOKEN_PROG),
      mergeMap(({payload}) => {
        return ajaxPost('/user/refreshtoken', payload.body).pipe(
          pluck('response'),
          map((obj) => {
            StorageService.setToken(obj?.token);
            StorageService.setRefreshToken(obj?.refreshToken);
            return {
              type: AuthTypes.GET_NEW_ACCESS_TOKEN_SUCC,
            };
          }),
          catchError((err) => {
            StorageService.clearStorage();
            history.replace('/admin/auth/login');
            return of(AuthActions.signout(), {
              type: AuthTypes.GET_NEW_ACCESS_TOKEN_FAIL,
              payload: {
                err,
                message: err?.response?.message,
                status: err?.status,
              },
            });
          }),
        );
      }),
    );
  }

  static editProfile(action$, state$, {ajaxPut, history}) {
    return action$.pipe(
        ofType(AuthTypes.PROFILE_EDIT_PROG),
        switchMap(({payload}) => {
            return ajaxPut(`api/v1/${state$.value.auth.user.domain}/profile/${payload.id}/`, payload.body).pipe(
                pluck('response'),
                map((obj) => {
                    history.push('/admin/profile')
                    return {
                        type: AuthTypes.PROFILE_EDIT_SUCC,
                        payload: obj
                    }
                }),
                catchError((err) => {
                    let errText = '';
                    for (const [key, value] of Object.entries(err?.response || {})) {
                      errText += `${key}: ${value}`;
                    }
                    return of({
                        type: AuthTypes.PROFILE_EDIT_FAIL,
                        payload: {
                            message: errText,
                            status: err?.status
                        }
                    })
                })
            )
        })
    )
}

static stripeConnect(action$, state$, {ajaxPost, history}) {
  return action$.pipe(
      ofType(StripeTypes.STRIPE_CONNECT),
      switchMap(({payload}) => {
          return ajaxPost(`api/v1/${state$.value.auth.user.domain}/stripe-connect`, payload.body).pipe(
              pluck('response'),
              map((obj) => {
                  if (payload.callBack) payload.callBack(obj)
                  return {                      
                      type: StripeTypes.STRIPE_CONNECT_SUCCESS,
                      payload: obj
                  }
              }),
              catchError((err) => {
                  let errText = '';
                  console.warn(err);
                  for (const [key, value] of Object.entries(err?.response || {})) {
                    errText += `${key}: ${value}`;
                  }
                  return of({                     
                      type: StripeTypes.STRIPE_CONNECT_FAIL,
                      payload: {
                          message: errText,
                          status: err?.status
                      }
                  })
              })
          )
      })
  )
}
}
