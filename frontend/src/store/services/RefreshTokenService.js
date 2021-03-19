import { ofType } from 'redux-observable';
import { takeUntil, take, mergeMap, merge } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { StorageService } from './StorageService';
import { AuthActions } from '../actions/AuthActions';
import { AuthTypes } from '../action-types/AuthTypes';


export class RefreshTokenService {
    static getRefreshToken(action$, state$, source) {
        let user = StorageService.getUser();
        let body = {
            token: StorageService.getRefreshToken(),
            email: user?.userName
        };
        let isProgressRefreshToken = state$?.value?.auth?.isProgressRefreshToken;
        return action$.pipe(
            ofType(AuthTypes.GET_NEW_ACCESS_TOKEN_SUCC),
            takeUntil(
                action$.pipe(
                    ofType(AuthTypes.GET_NEW_ACCESS_TOKEN_FAIL)
                )
            ),
            take(1),
            mergeMap(() => source),
            merge(
                iif(() => isProgressRefreshToken, of(), of(AuthActions.getNewAccessToken(body))),
            ),
        );

    }
}