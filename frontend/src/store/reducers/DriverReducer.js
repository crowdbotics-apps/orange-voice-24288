import { DriverTypes } from '../action-types/DriverTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    drivers: [],
    driverHistory: [],
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    driver: undefined,
    paging: {}
};

export function driverReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DriverTypes.GET_DRIVERS_PROG:
            return { ...state, isProgressList: true, drivers: [] };
        case DriverTypes.GET_DRIVERS_SUCC:
            return { ...state, isProgressList: false, drivers: action.payload.result, paging: action.payload.paging };
        case DriverTypes.GET_DRIVERS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case DriverTypes.GET_DRIVER_HISTORY_PROG:
            return { ...state, isProgressList: true, driverHistory: [] };
        case DriverTypes.GET_DRIVER_HISTORY_SUCC:
            return { ...state, isProgressList: false, driverHistory: action.payload.result, paging: action.payload.paging };
        case DriverTypes.GET_DRIVER_HISTORY_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case DriverTypes.ADD_DRIVER_PROG:
            return { ...state, isProgress: true };
        case DriverTypes.ADD_DRIVER_SUCC:
            return { ...state, isProgress: false, };
        case DriverTypes.ADD_DRIVER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case DriverTypes.EDIT_DRIVER_PROG:
            return { ...state, isProgress: true };
        case DriverTypes.EDIT_DRIVER_SUCC:
            return { ...state, isProgress: false, };
        case DriverTypes.EDIT_DRIVER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case DriverTypes.DEL_DRIVER_PROG:
            return { ...state, isProgress: true };
        case DriverTypes.DEL_DRIVER_SUCC:
            return { ...state, isProgress: false, };
        case DriverTypes.DEL_DRIVER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case DriverTypes.TOGGLE_ADD_DRIVER_MODAL:
            return { ...state, openAddModal: !state.openAddModal };

        case DriverTypes.TOGGLE_EDIT_DRIVER_MODAL:
            return { ...state, openEditModal: !state.openEditModal, driver: state.drivers[action.payload.index] };

        case DriverTypes.TOGGLE_DEL_DRIVER_MODAL:
            return { ...state, openDelModal: !state.openDelModal, driver: state.drivers[action.payload.index] };
        // case DriverTypes.CLEAR_DRIVER:
        //     return { ...state, driver: {} };
        default:
            return state;
    }
}