import { LocationTypes } from '../action-types/LocationTypes';


export class LocationActions {
    static getLocations(page = 1, pageSize = 10, search = '') {
        return {
            type: LocationTypes.GET_LOCATIONS_PROG,
            payload: { page, pageSize, search }
        };
    }
    static addLocation(body) {
        return {
            type: LocationTypes.ADD_LOCATION_PROG,
            payload: { body }
        };
    }
    static editLocation(body) {
        return {
            type: LocationTypes.EDIT_LOCATION_PROG,
            payload: { body }
        };
    }
    static delLocation(id) {
        return {
            type: LocationTypes.DEL_LOCATION_PROG,
            payload: { id }
        };
    }
    static toggleAddLocationModal() {
        return {
            type: LocationTypes.TOGGLE_ADD_LOCATION_MODAL
        };
    }
    static toggleEditLocationModal(index = -1) {
        return {
            type: LocationTypes.TOGGLE_EDIT_LOCATION_MODAL,
            payload: { index }
        };
    }
    static toggleDelLocationModal(index = -1) {
        return {
            type: LocationTypes.TOGGLE_DEL_LOCATION_MODAL,
            payload: { index }
        };
    }
    // static clearLoction() {
    //     return {
    //         type: LocationTypes.CLEAR_LOCATION
    //     };
    // }
}