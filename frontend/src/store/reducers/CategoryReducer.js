import { CategoryTypes } from '../action-types/CategoryTypes';


let INITIAL_STATE = {
    isProgressList: false,
    isProgress: false,
    isError: false,
    errorText: '',
    errorStatus: 0,
    categories: [],
    openAddModal: false,
    openEditModal: false,
    openDelModal: false,
    category: undefined,
    paging: {}
};

export function categoryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CategoryTypes.GET_CATEGORIES_PROG:
            return { ...state, isProgressList: true, categories: [] };
        case CategoryTypes.GET_CATEGORIES_SUCC:
            return { ...state, isProgressList: false, categories: action.payload.result, paging: action.payload.paging };
        case CategoryTypes.GET_CATEGORIES_FAIL:
            return { ...state, isProgressList: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case CategoryTypes.ADD_CATEGORY_PROG:
            return { ...state, isProgress: true };
        case CategoryTypes.ADD_CATEGORY_SUCC:
            return { ...state, isProgress: false, };
        case CategoryTypes.ADD_CATEGORY_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };



        case CategoryTypes.EDIT_CATEGORY_PROG:
            return { ...state, isProgress: true };
        case CategoryTypes.EDIT_CATEGORY_SUCC:
            return { ...state, isProgress: false, };
        case CategoryTypes.EDIT_CATEGORY_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };




        case CategoryTypes.DEL_CATEGORY_PROG:
            return { ...state, isProgress: true };
        case CategoryTypes.DEL_CATEGORY_SUCC:
            return { ...state, isProgress: false, };
        case CategoryTypes.DEL_CATEGORY_FAIL:
            return { ...state, isProgress: false, isError: true, errorText: action.payload.message, errorStatus: action.payload.status };


        case CategoryTypes.TOGGLE_ADD_CATEGORY_MODAL:
            return { ...state, openAddModal: !state.openAddModal };

        case CategoryTypes.TOGGLE_EDIT_CATEGORY_MODAL:
            return { ...state, openEditModal: !state.openEditModal, category: state.categories[action.payload.index] };

        case CategoryTypes.TOGGLE_DEL_CATEGORY_MODAL:
            return { ...state, openDelModal: !state.openDelModal, category: state.categories[action.payload.index] };
        // case CategoryTypes.CLEAR_CATEGORY:
        //     return { ...state, category: {} };
        default:
            return state;
    }
}