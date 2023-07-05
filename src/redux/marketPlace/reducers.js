import produce from 'immer';
import {
    //Brand
    GET_ALL_BRANDS_SUCCESS,
    GET_ALL_BRAND_LIST_SUCCESS,

    //Category
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_BY_BRAND_SUCCESS,

    //SubCategory
    GET_ALL_SUBCATEGORIES_SUCCESS,
    GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY_SUCCESS
} from './constants';

const INITIAL_STATE = {
    brandsList: [],
    brandArray: [],
    categoryList: [],
    categoryArray: [],
    subCategoryList: [],
    subCategoryArray: []
};

const marketPlaceReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_BRANDS_SUCCESS:
            draft.brandsList = action.payload;
            break;
        case GET_ALL_BRAND_LIST_SUCCESS:
            draft.brandArray = action.payload;
            break;
        case GET_ALL_CATEGORIES_SUCCESS:
            draft.categoryList = action.payload;
            break;

        case GET_ALL_CATEGORIES_BY_BRAND_SUCCESS:
            draft.categoryArray = action.payload;
            break;

        case GET_ALL_SUBCATEGORIES_SUCCESS:
            draft.subCategoryList = action.payload;
            break;

        case GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY_SUCCESS:
            draft.subCategoryArray = action.payload;
            break;
        default:
    }
}, INITIAL_STATE);

export default marketPlaceReducer;
