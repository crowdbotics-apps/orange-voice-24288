import { ServiceTypes } from '../action-types/ServiceTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    services: [],
    servicesByCategory: [],
    service: undefined,
    openDelModal: false,
    paging: {}
};

export function serviceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ServiceTypes.GET_SERVICES_PROG:
            return { ...state, isProgressList: true, services: [] };
        case ServiceTypes.GET_SERVICES_SUCC:
            return { ...state, isProgressList: false, services: action.payload.result, paging: action.payload.paging };
        case ServiceTypes.GET_SERVICES_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case ServiceTypes.GET_SERVICES_BY_CATEGORY_PROG:
            return { ...state, isProgress: true };

        case ServiceTypes.GET_SERVICES_BY_CATEGORY_SUCC:
            return { ...state, isProgress: false, servicesByCategory: action.payload.services };

        case ServiceTypes.GET_SERVICES_BY_CATEGORY_FAIL:
            return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };



        case ServiceTypes.ADD_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.ADD_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.ADD_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case ServiceTypes.EDIT_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.EDIT_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.EDIT_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case ServiceTypes.DEL_SERVICE_PROG:
            return { ...state, isProgress: true };
        case ServiceTypes.DEL_SERVICE_SUCC:
            return { ...state, isProgress: false, };
        case ServiceTypes.DEL_SERVICE_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case ServiceTypes.TOGGLE_DEL_SERVICE_MODAL:
            return { ...state, openDelModal: !state.openDelModal, service: state.services[action.payload.index] };
        default:
            return state;
    }
}