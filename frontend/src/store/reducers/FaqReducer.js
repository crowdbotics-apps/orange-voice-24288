import { FaqTypes } from '../action-types/FaqTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    faqs: [],
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    faq: undefined,
    paging: {}
};

export function faqReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FaqTypes.GET_FAQS_PROG:
            return { ...state, isProgressList: true, faqs: [] };
        case FaqTypes.GET_FAQS_SUCC:
            return { ...state, isProgressList: false, faqs: action.payload.result, paging: action.payload.paging };
        case FaqTypes.GET_FAQS_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case FaqTypes.ADD_FAQ_PROG:
            return { ...state, isProgress: true };
        case FaqTypes.ADD_FAQ_SUCC:
            return { ...state, isProgress: false, };
        case FaqTypes.ADD_FAQ_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case FaqTypes.EDIT_FAQ_PROG:
            return { ...state, isProgress: true };
        case FaqTypes.EDIT_FAQ_SUCC:
            return { ...state, isProgress: false, };
        case FaqTypes.EDIT_FAQ_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case FaqTypes.DEL_FAQ_PROG:
            return { ...state, isProgress: true };
        case FaqTypes.DEL_FAQ_SUCC:
            return { ...state, isProgress: false, };
        case FaqTypes.DEL_FAQ_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case FaqTypes.TOGGLE_ADD_FAQ_MODAL:
            return { ...state, openAddModal: !state.openAddModal };

        case FaqTypes.TOGGLE_EDIT_FAQ_MODAL:
            return { ...state, openEditModal: !state.openEditModal, faq: state.faqs[action.payload.index] };

        case FaqTypes.TOGGLE_DEL_FAQ_MODAL:
            return { ...state, openDelModal: !state.openDelModal, faq: state.faqs[action.payload.index] };
        // case FaqTypes.CLEAR_FAQ:
        //     return { ...state, faq: {} };
        default:
            return state;
    }
}