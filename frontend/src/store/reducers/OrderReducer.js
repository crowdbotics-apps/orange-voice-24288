import { OrderTypes } from '../action-types/OrderTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isProgressEdit: false,
    isProgressCSV: false,
    isProgressPost: false,
    isProgressPickupSlot: false,
    isProgressDropoffSlot: false,
    isError: false,
    isErrorPickupSlot: false,
    isErrorDropoffSlot: false,
    errorText: '',
    errorStatus: 0,
    orders: [],
    isPickupSlotAvailable: false,
    isDropoffSlotAvailable: false,
    csvData: undefined,
    order: undefined,
    openStatusModal: false,
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    openPdfModal: false,
    paging: {},
    addresses: [],
    config: {
        system: {},
        timeSlots: []
    },
};

export function orderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OrderTypes.GET_ORDERS_PROG:
            return { ...state, isProgressList: true, orders: [] };
        case OrderTypes.GET_ORDERS_SUCC:
            return { ...state, isProgressList: false, orders: action.payload.result, paging: action.payload.paging };
        case OrderTypes.GET_ORDERS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case OrderTypes.GET_ORDER_PROG:
            return { ...state, isProgress: true, order: undefined };
        case OrderTypes.GET_ORDER_SUCC:
            return { ...state, isProgress: false, order: action.payload.result, };
        case OrderTypes.GET_ORDER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case OrderTypes.POST_ORDER_PROG:
            return { ...state, isProgressPost: true, };
        case OrderTypes.POST_ORDER_SUCC:
            return { ...state, isProgressPost: false, };
        case OrderTypes.POST_ORDER_FAIL:
            return { ...state, isProgressPost: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case OrderTypes.UPDATE_ORDER_STATUS_PROG:
            return { ...state, isProgress: true };
        case OrderTypes.UPDATE_ORDER_STATUS_SUCC:
            return { ...state, isProgress: false, };
        case OrderTypes.UPDATE_ORDER_STATUS_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case OrderTypes.CANCEL_ORDER_PROG:
            return { ...state, isProgress: true };
        case OrderTypes.CANCEL_ORDER_SUCC:
            return { ...state, isProgress: false, };
        case OrderTypes.CANCEL_ORDER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case OrderTypes.EDIT_ORDER_PROG:
            return { ...state, isProgressEdit: true };
        case OrderTypes.EDIT_ORDER_SUCC:
            return { ...state, isProgressEdit: false, };
        case OrderTypes.EDIT_ORDER_FAIL:
            return { ...state, isProgressEdit: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case OrderTypes.CHECK_SELECTED_PICKUP_SLOT_PROG:
            return { ...state, isProgressPickupSlot: true, isPickupSlotAvailable: false, isErrorPickupSlot: false };
        case OrderTypes.CHECK_SELECTED_PICKUP_SLOT_SUCC:
            return { ...state, isProgressPickupSlot: false, isPickupSlotAvailable: true };
        case OrderTypes.CHECK_SELECTED_PICKUP_SLOT_FAIL:
            return { ...state, isProgressPickupSlot: false, isErrorPickupSlot: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_PROG:
            return { ...state, isProgressDropoffSlot: true, isDropoffSlotAvailable: false, isErrorDropoffSlot: false };
        case OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_SUCC:
            return { ...state, isProgressDropoffSlot: false, isDropoffSlotAvailable: true };
        case OrderTypes.CHECK_SELECTED_DROPOFF_SLOT_FAIL:
            return { ...state, isProgressDropoffSlot: false, isErrorDropoffSlot: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case OrderTypes.GET_CSV_DATA_PROG:
            return { ...state, isProgressCSV: true };
        case OrderTypes.GET_CSV_DATA_SUCC:
            return { ...state, isProgressCSV: false, csvData: action.payload.result };
        case OrderTypes.GET_CSV_DATA_FAIL:
            return { ...state, isProgressCSV: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case OrderTypes.CLEAR_CSV_DATA:
            return { ...state, csvData: undefined };


        case OrderTypes.GET_LOV_PROG:
            return { ...state, isProgress: true };
        case OrderTypes.GET_LOV_SUCC:
            return { ...state, isProgress: false, config: action.payload.config };
        case OrderTypes.GET_LOV_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case OrderTypes.GET_ADDRESSES_PROG:
            return { ...state };

        case OrderTypes.GET_ADDRESSES_SUCC:
            return { ...state, addresses: action.payload.addresses };

        case OrderTypes.GET_ADDRESSES_FAIL:
            return { ...state, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case OrderTypes.TOGGLE_STATUS_CONFIRMATION_MODAL:
            return { ...state, openStatusModal: !state.openStatusModal, order: state.orders[action.payload.index] };

        case OrderTypes.TOGGLE_EDIT_ORDER_MODAL:
            return { ...state, openEditModal: !state.openEditModal, };


        case OrderTypes.TOGGLE_PDF_ORDER_MODAL:
            return { ...state, openPdfModal: !state.openPdfModal, };


        case OrderTypes.CLEAR_ERROR:
            return { ...state, isError: false, isErrorDropoffSlot: false, isErrorPickupSlot: false, errorText: '', errorStatus: 0 };

        // case OrderTypes.TOGGLE_DEL_CATEGORY_MODAL:
        //     return { ...state, openDelModal: !state.openDelModal, category: state.categories[action.payload.index] };
        // case OrderTypes.CLEAR_CATEGORY:
        //     return { ...state, category: {} };
        default:
            return state;
    }
}