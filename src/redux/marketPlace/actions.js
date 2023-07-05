import {
    // Brand
    GET_ALL_BRANDS,
    GET_ALL_BRANDS_SUCCESS,
    GET_ALL_BRAND_LIST,
    GET_ALL_BRAND_LIST_SUCCESS,
    ADD_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    CHECK_BRAND_NAME_AVAILABILITY,
    
    //Category
    GET_ALL_CATEGORIES,
    GET_ALL_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORIES_BY_BRAND,
    GET_ALL_CATEGORIES_BY_BRAND_SUCCESS,

    //SubCategories
    GET_ALL_SUBCATEGORIES,
    GET_ALL_SUBCATEGORIES_SUCCESS,
    ADD_SUBCATEGORY,
    UPDATE_SUBCATEGORY,
    DELETE_SUBCATEGORY,
    GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY,
    GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY_SUCCESS,
    CHANGE_NFT_STATUS_OF_SUBCATEGORY
} from './constants';

// Brands

export const checkBrandNameAvailability = (data) => {
    return {
        type: CHECK_BRAND_NAME_AVAILABILITY,
        payload: data
    };
};

export const getAllBrands = (data) => {
    return {
        type: GET_ALL_BRANDS,
        payload: data
    };
};

export const getAllBrandsSuccess = (data) => {
    return {
        type: GET_ALL_BRANDS_SUCCESS,
        payload: data
    };
};

export const getAllBrandList = () => {
    return {
        type: GET_ALL_BRAND_LIST
    };
};

export const getAllBrandListSuccess = (data) => {
    return {
        type: GET_ALL_BRAND_LIST_SUCCESS,
        payload: data
    };
};

export const addBrand = (data) => {
    return {
        type: ADD_BRAND,
        payload: data
    };
};

export const updateBrand = (data) => {
    return {
        type: UPDATE_BRAND,
        payload: data
    };
};

export const deleteBrand = (data) => {
    return {
        type: DELETE_BRAND,
        payload: data
    };
};


// Category

export const getAllCategories = (data) => {
    return {
        type: GET_ALL_CATEGORIES,
        payload: data
    };
};

export const getAllCategoriesSuccess = (data) => {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: data
    };
};

export const addCategory = (data) => {
    return {
        type: ADD_CATEGORY,
        payload: data
    };
};

export const updateCategory = (data) => {
    return {
        type: UPDATE_CATEGORY,
        payload: data
    };
};

export const deleteCategory = (data) => {
    return {
        type: DELETE_CATEGORY,
        payload: data
    };
};

export const getAllCategoriesByBrand = (data) => {
    return {
        type: GET_ALL_CATEGORIES_BY_BRAND,
        payload: data
    };
};

export const getAllCategoriesByBrandSuccess = (data) => {
    return {
        type: GET_ALL_CATEGORIES_BY_BRAND_SUCCESS,
        payload: data
    };
};



// Category



export const getAllSubCategories = (data) => {
    return {
        type: GET_ALL_SUBCATEGORIES,
        payload: data
    };
};

export const getAllSubCategoriesSuccess = (data) => {
    return {
        type: GET_ALL_SUBCATEGORIES_SUCCESS,
        payload: data
    };
};

export const addSubCategory = (data) => {
    return {
        type: ADD_SUBCATEGORY,
        payload: data
    };
};

export const updateSubCategory = (data) => {
    return {
        type: UPDATE_SUBCATEGORY,
        payload: data
    };
};

export const deleteSubCategory = (data) => {
    return {
        type: DELETE_SUBCATEGORY,
        payload: data
    };
};

export const getAllSubCategoriesByBrandAndCategory = (data) => {
    return {
        type: GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY,
        payload: data
    };
};

export const getAllSubCategoriesByBrandAndCategorySuccess = (data) => {
    return {
        type: GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY_SUCCESS,
        payload: data
    };
};
export const changeNftStatusOfSubCategory = (data) => {
    return {
        type: CHANGE_NFT_STATUS_OF_SUBCATEGORY,
        payload: data
    };
};