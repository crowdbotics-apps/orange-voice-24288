import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {switchMap, pluck, catchError, map} from 'rxjs/operators';
import {AuthTypes} from '../action-types/AuthTypes';
import {ProfileTypes} from '../action-types/ProfileTypes';

export class ProfileEpics {
  static editProfile(action$, state$, {ajaxPut, history}) {
    return action$.pipe(
      ofType(ProfileTypes.PROFILE_EDIT_PROG),
      switchMap(({payload}) => {
        return ajaxPut(`api/v1/${state$.value.auth.user.domain}/profile/${payload.id}/`, payload.body).pipe(
          pluck('response'),
          map((obj) => {
            history.push('/admin/profile');
            return {
              type: AuthTypes.UPDATE_USER_DETAILS,
              payload: obj,
            };
          }),
          catchError((err) => {
            let errText = '';
            for (const [key, value] of Object.entries(err?.response || {})) {
              errText += `${key}: ${value}`;
            }
            return of({
              type: ProfileTypes.PROFILE_EDIT_FAIL,
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
}
