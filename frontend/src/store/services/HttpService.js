import { ajax } from 'rxjs/ajax';
import { StorageService } from './StorageService';
import { API_URL } from './Config';
export class HttpService {

    static get(url, headers = { 'Content-Type': 'application/json' }) {
        const auth = StorageService.getToken() ? {'Authorization': 'Token '+ StorageService.getToken()}: {}
        return ajax({
            url: `${API_URL}${url}`,
            headers: { ...headers, ...auth },
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url, body, headers = { 'Content-Type': 'application/json' }) {
        const auth = StorageService.getToken() ? {'Authorization': 'Token '+ StorageService.getToken()}: {}
        return ajax({
            url: `${API_URL}${url}`,
            method: 'POST',
            body,
            headers: { ...headers, ...auth },
            async: true,
            crossDomain: true,
            responseType: 'json',
            // createXHR: () => new XMLHttpRequest()
        });
    } // post
    static put(url, body, headers = { 'Content-Type': 'application/json' }) {
        const auth = StorageService.getToken() ? {'Authorization': 'Token '+ StorageService.getToken()}: {}
        return ajax({
            url: `${API_URL}${url}`,
            method: 'PUT',
            body,
            headers: { ...headers, ...auth },
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // put

    static delete(url, body, headers = { 'Content-Type': 'application/json' }) {
        const auth = StorageService.getToken() ? {'Authorization': 'Token '+ StorageService.getToken()}: {}
        return ajax({
            url: `${API_URL}${url}`,
            method: 'DELETE',
            body,
            headers: { ...headers, ...auth },
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // delete
}