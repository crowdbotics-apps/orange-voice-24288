import { ajax } from 'rxjs/ajax';
import { StorageService } from './StorageService';
import { API_URL } from './Config';
export class HttpService {

    static get(url, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url: `${API_URL}/api${url}`,
            headers: { ...headers, 'Authorization': `Bearer ${StorageService.getToken()}` },
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url, body, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'POST',
            body,
            headers: { ...headers, 'Authorization': `Bearer ${StorageService.getToken()}` },
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // post
    static put(url, body, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'PUT',
            body,
            headers: { ...headers, 'Authorization': `Bearer ${StorageService.getToken()}` },
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // put

    static delete(url, body, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'DELETE',
            body,
            headers:{ ...headers, 'Authorization': `Bearer ${StorageService.getToken()}` },
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // delete
}