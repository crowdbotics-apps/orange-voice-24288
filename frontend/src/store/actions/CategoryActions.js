import { CategoryTypes } from '../action-types/CategoryTypes';


export class CategoryActions {
    static getCategories(page = 1, pageSize = 10, search = '') {
        return {
            type: CategoryTypes.GET_CATEGORIES_PROG,
            payload: { page, pageSize, search }
        };
    }
    static addCategory(body) {
        return {
            type: CategoryTypes.ADD_CATEGORY_PROG,
            payload: { body }
        };
    }
    static editCategory(body) {
        return {
            type: CategoryTypes.EDIT_CATEGORY_PROG,
            payload: { body }
        };
    }
    static delCategory(id) {
        return {
            type: CategoryTypes.DEL_CATEGORY_PROG,
            payload: { id }
        };
    }
    static toggleAddCategoryModal() {
        return {
            type: CategoryTypes.TOGGLE_ADD_CATEGORY_MODAL
        };
    }
    static toggleEditCategoryModal(index = -1) {
        return {
            type: CategoryTypes.TOGGLE_EDIT_CATEGORY_MODAL,
            payload: { index }
        };
    }
    static toggleDelCategoryModal(index = -1) {
        return {
            type: CategoryTypes.TOGGLE_DEL_CATEGORY_MODAL,
            payload: { index }
        };
    }
    // static clearCategory() {
    //     return {
    //         type: CategoryTypes.CLEAR_CATEGORY
    //     };
    // }
}