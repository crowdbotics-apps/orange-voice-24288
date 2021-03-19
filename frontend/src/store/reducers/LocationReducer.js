import { LocationTypes } from '../action-types/LocationTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    locations: [],
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    location: undefined,
    paging: {}
};

export function locationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LocationTypes.GET_LOCATIONS_PROG:
            return { ...state, isProgressList: true, locations: [] };
        case LocationTypes.GET_LOCATIONS_SUCC:
            return { ...state, isProgressList: false, locations: action.payload.result, paging: action.payload.paging };
        case LocationTypes.GET_LOCATIONS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case LocationTypes.ADD_LOCATION_PROG:
            return { ...state, isProgress: true };
        case LocationTypes.ADD_LOCATION_SUCC:
            return { ...state, isProgress: false, };
        case LocationTypes.ADD_LOCATION_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case LocationTypes.EDIT_LOCATION_PROG:
            return { ...state, isProgress: true };
        case LocationTypes.EDIT_LOCATION_SUCC:
            return { ...state, isProgress: false, };
        case LocationTypes.EDIT_LOCATION_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case LocationTypes.DEL_LOCATION_PROG:
            return { ...state, isProgress: true };
        case LocationTypes.DEL_LOCATION_SUCC:
            return { ...state, isProgress: false, };
        case LocationTypes.DEL_LOCATION_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case LocationTypes.TOGGLE_ADD_LOCATION_MODAL:
            return { ...state, openAddModal: !state.openAddModal };

        case LocationTypes.TOGGLE_EDIT_LOCATION_MODAL:
            return { ...state, openEditModal: !state.openEditModal, location: state.locations[action.payload.index] };

        case LocationTypes.TOGGLE_DEL_LOCATION_MODAL:
            return { ...state, openDelModal: !state.openDelModal, location: state.locations[action.payload.index] };
        // case LocationTypes.CLEAR_LOCATION:
        //     return { ...state, location: {} };
        default:
            return state;
    }
}