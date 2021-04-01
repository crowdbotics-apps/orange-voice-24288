import { AuthTypes } from '../action-types/AuthTypes';

export class AuthActions {
    static signin(body) {
        return {
            type: AuthTypes.SIGNIN_PROG,
            payload: { body }
        };
    }


    static resetPassword(body) {
        return {
            type: AuthTypes.RESET_PASSWORD_PROG,
            payload: { body }
        }
    }

    static signup(body) {
        return {
            type: AuthTypes.SIGNUP_PROG,
            payload: { body }
        };
    }
    static getNewAccessToken(body) {
        return {
            type: AuthTypes.GET_NEW_ACCESS_TOKEN_PROG,
            payload: { body }
        };
    }
    static getAllUsers(page = 1, pageSize = 10, search = '') {
        return {
            type: AuthTypes.GET_ALL_USERS_PROG,
            payload: { page, pageSize, search }
        };
    }
    static setUser(user) {
        return {
            type: AuthTypes.SET_USER,
            payload: { user }
        };
    }
    static clearError() {
        return {
            type: AuthTypes.CLEAR_ERROR,
        };
    }
    static signout() {
        return {
            type: AuthTypes.SIGNOUT_USER
        };
    }
}