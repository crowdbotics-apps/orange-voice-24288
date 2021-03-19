import { ServiceTypes } from '../action-types/ServiceTypes';


export class ServiceActions {
    static getServices(page = 1, pageSize = 10, search = '') {
        return {
            type: ServiceTypes.GET_SERVICES_PROG,
            payload: { page, pageSize, search }
        };
    }
    static getServicesByCategory(categoryId) {
        return {
            type: ServiceTypes.GET_SERVICES_BY_CATEGORY_PROG,
            payload: { categoryId }
        };
    }
    static addService(body, history) {
        return {
            type: ServiceTypes.ADD_SERVICE_PROG,
            payload: { body, history }
        };
    }
    static editService(body, history) {
        return {
            type: ServiceTypes.EDIT_SERVICE_PROG,
            payload: { body, history }
        };
    }
    static delService(id) {
        return {
            type: ServiceTypes.DEL_SERVICE_PROG,
            payload: { id }
        };
    }
    static toggleDelServiceModal(index = -1) {
        return {
            type: ServiceTypes.TOGGLE_DEL_SERVICE_MODAL,
            payload: { index }
        };
    }

}