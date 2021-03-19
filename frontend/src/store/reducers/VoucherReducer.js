import { VoucherTypes } from '../action-types/VoucherTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    vouchers: [],
    voucher: undefined,
    openDelModal: false,
    paging: {}
};

export function voucherReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case VoucherTypes.GET_VOUCHERS_PROG:
            return { ...state, isProgressList: true, vouchers: [] };
        case VoucherTypes.GET_VOUCHERS_SUCC:
            return { ...state, isProgressList: false, vouchers: action.payload.result, paging: action.payload.paging };
        case VoucherTypes.GET_VOUCHERS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case VoucherTypes.ADD_VOUCHER_PROG:
            return { ...state, isProgress: true };
        case VoucherTypes.ADD_VOUCHER_SUCC:
            return { ...state, isProgress: false, };
        case VoucherTypes.ADD_VOUCHER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case VoucherTypes.EDIT_VOUCHER_PROG:
            return { ...state, isProgress: true };
        case VoucherTypes.EDIT_VOUCHER_SUCC:
            return { ...state, isProgress: false, };
        case VoucherTypes.EDIT_VOUCHER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case VoucherTypes.DEL_VOUCHER_PROG:
            return { ...state, isProgress: true };
        case VoucherTypes.DEL_VOUCHER_SUCC:
            return { ...state, isProgress: false, };
        case VoucherTypes.DEL_VOUCHER_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };

        case VoucherTypes.TOGGLE_DEL_VOUCHER_MODAL:
            return { ...state, openDelModal: !state.openDelModal, voucher: state.vouchers[action.payload.index] };
        default:
            return state;
    }
}