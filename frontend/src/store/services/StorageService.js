export class StorageService {
    static getToken() {
        return localStorage.getItem('token');
    }
    static setToken(token) {
        localStorage.setItem('token', token);
    }
    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    static setRefreshToken(refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
    }
    static clearToken() {
        localStorage.removeItem('token');
    }
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    static getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    static clearUser() {
        localStorage.removeItem('user');
    }
    static clearStorage() {
        localStorage.clear();
    }
}