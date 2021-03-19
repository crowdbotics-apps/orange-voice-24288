import { FaqTypes } from '../action-types/FaqTypes';


export class FaqActions {
    static getFaqs(page = 1, pageSize = 10, search = '') {
        return {
            type: FaqTypes.GET_FAQS_PROG,
            payload: { page, pageSize, search }
        };
    }
    static addFaq(body) {
        return {
            type: FaqTypes.ADD_FAQ_PROG,
            payload: { body }
        };
    }
    static editFaq(body) {
        return {
            type: FaqTypes.EDIT_FAQ_PROG,
            payload: { body }
        };
    }
    static delFaq(id) {
        return {
            type: FaqTypes.DEL_FAQ_PROG,
            payload: { id }
        };
    }
    static toggleAddFaqModal() {
        return {
            type: FaqTypes.TOGGLE_ADD_FAQ_MODAL
        };
    }
    static toggleEditFaqModal(index = -1) {
        return {
            type: FaqTypes.TOGGLE_EDIT_FAQ_MODAL,
            payload: { index }
        };
    }
    static toggleDelFaqModal(index = -1) {
        return {
            type: FaqTypes.TOGGLE_DEL_FAQ_MODAL,
            payload: { index }
        };
    }
    // static clearFaq() {
    //     return {
    //         type: FaqTypes.CLEAR_FAQ
    //     };
    // }
}