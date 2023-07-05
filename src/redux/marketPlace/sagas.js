import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import {
    // Brand
    getAllBrands,
    getAllBrandsSuccess,
    getAllBrandListSuccess,
    getAllBrandList,
    // Category
    getAllCategories,
    getAllCategoriesSuccess,
    getAllCategoriesByBrandSuccess,
    getAllCategoriesByBrand,
    // SubCategory
    getAllSubCategories,
    getAllSubCategoriesSuccess,
    getAllSubCategoriesByBrandAndCategorySuccess
} from './actions';
import {
    // Brand
    GET_ALL_BRANDS,
    GET_ALL_BRAND_LIST,
    ADD_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    CHECK_BRAND_NAME_AVAILABILITY,
    // Category
    GET_ALL_CATEGORIES,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORIES_BY_BRAND,
    // SubCategory
    GET_ALL_SUBCATEGORIES,
    ADD_SUBCATEGORY,
    UPDATE_SUBCATEGORY,
    DELETE_SUBCATEGORY,
    GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY,
    CHANGE_NFT_STATUS_OF_SUBCATEGORY
} from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

// Brand Module API
function* checkBrandNameAvailabilityRequest({ payload }) {
    let data = {
        name: payload.name
    };
    try {
       
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/brand/checkBrandNameAvailability`, data, headers);
        if (response.data.success == true) {
            payload.handleContractDeployment();
        }
    } catch (error) {
        payload.setLoader(false);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchCheckBrandNameAvaility() {
    yield takeLatest(CHECK_BRAND_NAME_AVAILABILITY, checkBrandNameAvailabilityRequest);
}

function* getAllBrandsRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/brand/getAll?size=${payload.limit}&page=${payload.page}&search=${payload.search}`, headers);
        yield put(getAllBrandsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllBrands() {
    yield takeLatest(GET_ALL_BRANDS, getAllBrandsRequest);
}

function* getAllBrandListRequest({}) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/brand/getAllBrands`, headers);
        yield put(getAllBrandListSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllBrandList() {
    yield takeLatest(GET_ALL_BRAND_LIST, getAllBrandListRequest);
}

function* addBrandRequest({ payload }) {
    let data = {
        name: payload.name,
        contractAddress: payload.contractAddress
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/brand/add`, data, headers);
        yield put(
            getAllBrands({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        payload.setBrandName('');
        yield put(getAllBrandList());
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddBrand() {
    yield takeLatest(ADD_BRAND, addBrandRequest);
}

function* updateBrandRequest({ payload }) {
    let data = {
        brandId: payload.brandId,
        name: payload.name
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/brand/update`, data, headers);
        yield put(
            getAllBrands({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        payload.setBrandName('');
        yield put(getAllBrandList());
        yield SetNotification('success', response.data.message);
    } catch (error) {
        payload.setLoader(false);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateBrand() {
    yield takeLatest(UPDATE_BRAND, updateBrandRequest);
}

function* deleteBrandRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/brand/delete/${payload.id}`, headers);
        yield put(
            getAllBrands({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        yield put(getAllBrandList());
        yield put(
            getAllCategories({
                search: '',
                page: 1,
                limit: 10,
                brandId: ''
            })
        );
        yield put(
            getAllCategoriesByBrand({
                brandId: 0
            })
        );

        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteBrand() {
    yield takeLatest(DELETE_BRAND, deleteBrandRequest);
}

// Category Module API

function* getAllCategoriesRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/category/getAll?size=${payload.limit}&page=${payload.page}&search=${payload.search}&brandId=${payload.brandId}`,
            headers
        );
        yield put(getAllCategoriesSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllCategories() {
    yield takeLatest(GET_ALL_CATEGORIES, getAllCategoriesRequest);
}

function* addCategoryRequest({ payload }) {
    let data = {
        name: payload.name,
        brandId: payload.brandId
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/category/add`, data, headers);
        yield put(
            getAllCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: payload.mainBrandId == 0 ? '' : payload.mainBrandId
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY, addCategoryRequest);
}

function* updateCategoryRequest({ payload }) {
    let data = {
        name: payload.name,
        brandId: payload.brandId,
        categoryId: payload.categoryId
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/category/update`, data, headers);
        yield put(
            getAllCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: ''
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateCategory() {
    yield takeLatest(UPDATE_CATEGORY, updateCategoryRequest);
}

function* deleteCategoryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`admin/category/delete/${payload.brandId}/${payload.categoryId}`, headers);
        yield put(
            getAllCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: ''
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteCategory() {
    yield takeLatest(DELETE_CATEGORY, deleteCategoryRequest);
}

function* getAllCategoryByBrandRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/category/getAllCategoriesByBrand/${payload.brandId}`, headers);
        yield put(getAllCategoriesByBrandSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllCategoryByBrand() {
    yield takeLatest(GET_ALL_CATEGORIES_BY_BRAND, getAllCategoryByBrandRequest);
}

// Sub Category module API'S

function* getAllSubCategoriesRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/subCategory/getAll?size=${payload.limit}&page=${payload.page}&search=${payload.search}&brandId=${payload.brandId}&categoryId=${payload.categoryId}`,
            headers
        );
        yield put(getAllSubCategoriesSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllSubCategories() {
    yield takeLatest(GET_ALL_SUBCATEGORIES, getAllSubCategoriesRequest);
}

function* addSubCategoryRequest({ payload }) {
    let data = {
        name: payload.name,
        nftName: payload.nftName,
        nftDescription: payload.nftDescription,
        nftPrice: payload.nftPrice,
        currencyType: payload.currencyType,
        categoryId: payload.categoryId
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/subCategory/add`, data, headers);
        yield put(
            getAllSubCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: payload.mainBrandId == 0 ? '' : payload.mainBrandId,
                categoryId: payload.mainCategoryId == 0 ? '' : payload.mainCategoryId
            })
        );
        payload.setBrand(0);
        payload.setCategory(0);
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddSubCategory() {
    yield takeLatest(ADD_SUBCATEGORY, addSubCategoryRequest);
}

function* updateSubCategoryRequest({ payload }) {
    let data = {
        name: payload.name,
        nftName: payload.nftName,
        nftDescription: payload.nftDescription,
        nftPrice: payload.nftPrice,
        currencyType: payload.currencyType,
        subCategoryId: payload.subCategoryId
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/subCategory/update`, data, headers);
        yield put(
            getAllSubCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: payload.mainBrandId == 0 ? '' : payload.mainBrandId,
                categoryId: payload.mainCategoryId == 0 ? '' : payload.mainCategoryId
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateSubCategory() {
    yield takeLatest(UPDATE_SUBCATEGORY, updateSubCategoryRequest);
}

function* deleteSubCategoryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`admin/subCategory/delete/${payload.subCategoryId}`, headers);
        yield put(
            getAllSubCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: payload.mainBrandId == 0 ? '' : payload.mainBrandId,
                categoryId: payload.mainCategoryId == 0 ? '' : payload.mainCategoryId
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteSubCategory() {
    yield takeLatest(DELETE_SUBCATEGORY, deleteSubCategoryRequest);
}

function* getAllSubCategoryByBrandAndCategoryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/subCategory/getAllSubCategoriesByCategory/${payload.categoryId}`, headers);
        yield put(getAllSubCategoriesByBrandAndCategorySuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllSubCategoryByBrandAndCategory() {
    yield takeLatest(GET_ALL_SUBCATEGORIES_BY_BRAND_AND_CATEGORY, getAllSubCategoryByBrandAndCategoryRequest);
}

function* changeNftStatusOfSubCategoryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/subCategory/changeStatus/${payload.subCategoryId}`, headers);
        yield put(
            getAllSubCategories({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                brandId: payload.mainBrandId == 0 ? '' : payload.mainBrandId,
                categoryId: payload.mainCategoryId == 0 ? '' : payload.mainCategoryId
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeNftStatusOfSubCategory() {
    yield takeLatest(CHANGE_NFT_STATUS_OF_SUBCATEGORY, changeNftStatusOfSubCategoryRequest);
}

export default function* marketPlaceSaga() {
    yield all([
        //Brand
        fork(watchGetAllBrands),
        fork(watchGetAllBrandList),
        fork(watchAddBrand),
        fork(watchDeleteBrand),
        fork(watchUpdateBrand),
        fork(watchCheckBrandNameAvaility),
        //Category
        fork(watchGetAllCategories),
        fork(watchAddCategory),
        fork(watchDeleteCategory),
        fork(watchUpdateCategory),
        fork(watchGetAllCategoryByBrand),
        //SubCategory
        fork(watchGetAllSubCategories),
        fork(watchAddSubCategory),
        fork(watchUpdateSubCategory),
        fork(watchDeleteSubCategory),
        fork(watchGetAllSubCategoryByBrandAndCategory),
        fork(watchChangeNftStatusOfSubCategory)
    ]);
}
