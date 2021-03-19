import { DriverTypes } from '../action-types/DriverTypes';


export class DriverActions {
    static getDrivers(page = 1, pageSize = 10, search = '') {
        return {
            type: DriverTypes.GET_DRIVERS_PROG,
            payload: { page, pageSize, search }
        };
    }

    static getDriverHistory(driverId, page = 1, pageSize = 10, search = '') {
        return {
            type: DriverTypes.GET_DRIVER_HISTORY_PROG,
            payload: { driverId, page, pageSize, search }
        };
    }
    static addDriver(body, history) {
        return {
            type: DriverTypes.ADD_DRIVER_PROG,
            payload: { body, history }
        };
    }
    static editDriver(body, history) {
        return {
            type: DriverTypes.EDIT_DRIVER_PROG,
            payload: { body, history }
        };
    }
    static delDriver(id) {
        return {
            type: DriverTypes.DEL_DRIVER_PROG,
            payload: { id }
        };
    }
    static toggleAddDriverModal() {
        return {
            type: DriverTypes.TOGGLE_ADD_DRIVER_MODAL
        };
    }
    static toggleEditDriverModal(index = -1) {
        return {
            type: DriverTypes.TOGGLE_EDIT_DRIVER_MODAL,
            payload: { index }
        };
    }
    static toggleDelDriverModal(index = -1) {
        return {
            type: DriverTypes.TOGGLE_DEL_DRIVER_MODAL,
            payload: { index }
        };
    }
    // static clearDriver() {
    //     return {
    //         type: DriverTypes.CLEAR_DRIVER
    //     };
    // }
}