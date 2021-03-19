import { VoucherTypes } from '../action-types/VoucherTypes';


export class VoucherActions {
    static getVouchers(page = 1, pageSize = 10, search = '') {
        return {
            type: VoucherTypes.GET_VOUCHERS_PROG,
            payload: { page, pageSize, search }
        };
    }
    static addVoucher(body, history) {
        return {
            type: VoucherTypes.ADD_VOUCHER_PROG,
            payload: { body, history }
        };
    }
    static editVoucher(body, history) {
        return {
            type: VoucherTypes.EDIT_VOUCHER_PROG,
            payload: { body, history }
        };
    }
    static delVoucher(id) {
        return {
            type: VoucherTypes.DEL_VOUCHER_PROG,
            payload: { id }
        };
    }
    static toggleDelVoucherModal(index = -1) {
        return {
            type: VoucherTypes.TOGGLE_DEL_VOUCHER_MODAL,
            payload: { index }
        };
    }

}