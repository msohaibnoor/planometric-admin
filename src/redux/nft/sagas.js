import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import {
    getAllNft,
    getAllNftSuccess,
    getAllNftForBunchMintSuccess,
    getAllNftForBunchTransferSuccess,
    getAllNftForBunchListingSuccess
} from './actions';
import {
    GET_ALL_NFT,
    ADD_NFT,
    UPDATE_NFT,
    DELETE_NFT,
    MINT_NFT,
    LAZY_MINT_NFT,
    CHANGE_STATUS,
    GET_ALL_NFT_FOR_BUNCH_MINT,
    TRANSFER_NFT,
    LIST_NFT_ON_MARKETPLACE,
    GET_ALL_NFT_FOR_BUNCH_TRANSFER,
    GET_ALL_NFT_FOR_BUNCH_LISTING,
    CHANGE_STATUS_IN_MARKETPLACE
} from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';
import { getAllMintedNft } from '../mintedNft/actions';

function* changeStatusInMarketplaceRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`/admin/nft/changeStatus/${payload.id}`,{}, headers);
        yield put(
            getAllMintedNft({
                page: payload.page,
                limit: payload.limit,
                type: payload.type,
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeStatusInMarketplaceNft() {
    yield takeLatest(CHANGE_STATUS_IN_MARKETPLACE, changeStatusInMarketplaceRequest);
}

function* getAllNftForBunchListingRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/nft/getAllNftsForBunchListing?subCategoryId=${payload.subCategoryId}`, headers);
        console.log('response', response.data.data);
        yield put(getAllNftForBunchListingSuccess(response.data.data.nfts));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllNftForBunchListing() {
    yield takeLatest(GET_ALL_NFT_FOR_BUNCH_LISTING, getAllNftForBunchListingRequest);
}

function* getAllNftForBunchTransferRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/nft/getAllNftsForBunchTransfer?subCategoryId=${payload.subCategoryId}`, headers);
        console.log('response', response.data.data);
        yield put(getAllNftForBunchTransferSuccess(response.data.data.nfts));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllNftForBunchTransfer() {
    yield takeLatest(GET_ALL_NFT_FOR_BUNCH_TRANSFER, getAllNftForBunchTransferRequest);
}

function* listNftOnMarketPlaceRequest({ payload }) {
    console.log('payload', payload.nftIdArray);
    let data = {
        nftIdArray: JSON.stringify(payload.nftIdArray)
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/listOnMarketPlace`, data, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brand,
                categoryId: payload.category,
                subCategoryId: payload.subCategory,
                type: payload.type,
                page: payload.page,
                limit: payload.limit
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchListNftOnMarketPlace() {
    yield takeLatest(LIST_NFT_ON_MARKETPLACE, listNftOnMarketPlaceRequest);
}

function* transferNftRequest({ payload }) {
    console.log('payload', payload.nftIdArray);
    let data = {
        nftIdArray: JSON.stringify(payload.nftIdArray)
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/transfer`, data, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brand,
                categoryId: payload.category,
                subCategoryId: payload.subCategory,
                type: payload.type,
                page: payload.page,
                limit: payload.limit
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchTransferNft() {
    yield takeLatest(TRANSFER_NFT, transferNftRequest);
}

function* getAllNftForBunchMintRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/nft/getAllNftsForBunchMint?subCategoryId=${payload.subCategoryId}`, headers);
        yield put(getAllNftForBunchMintSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllNftForBunchMint() {
    yield takeLatest(GET_ALL_NFT_FOR_BUNCH_MINT, getAllNftForBunchMintRequest);
}

function* lazyMintNftRequest({ payload }) {
    let data = {
        nftDataArray: JSON.stringify(payload.nftDataArray),
        tokenIdArray: JSON.stringify(payload.tokenIdArray)
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/lazyMint`, data, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId,
                type: payload.type,
                page: payload.page,
                limit: payload.limit
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetLazyMintNft() {
    yield takeLatest(LAZY_MINT_NFT, lazyMintNftRequest);
}

function* mintNftRequest({ payload }) {
    const formData = new FormData();
    formData.append('nftDataArray', JSON.stringify(payload.nftDataArray));
    formData.append('tokenIdArray', JSON.stringify(payload.tokenIdArray));
    formData.append('transactionHash', payload.transactionHash);
    formData.append('signerAddress', payload.signerAddress);

    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/mint`, formData, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId,
                type: payload.type,
                page: payload.page,
                limit: payload.limit
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetMintNft() {
    yield takeLatest(MINT_NFT, mintNftRequest);
}

function* getAllNftRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/nft/getAll?page=${payload.page}&size=${payload.limit}&brandId=${payload.brandId}&categoryId=${payload.categoryId}&subCategoryId=${payload.subCategoryId}&type=${payload.type}`,
            headers
        );
        yield put(getAllNftSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllNft() {
    yield takeLatest(GET_ALL_NFT, getAllNftRequest);
}

function* addNftRequest({ payload }) {
    const formData = new FormData();
    for (let i = 0; i < payload.assets.length; i++) {
        formData.append('asset', payload.assets[i]);
    }
    formData.append('quantityArray', JSON.stringify(payload.quantityArray));
    formData.append('brandId', payload.brandId);
    formData.append('categoryId', payload.categoryId);
    formData.append('subCategoryId', payload.subCategoryId);
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/add`, formData, headers);
        payload.handleClose();
        payload.navigate('/marketPlace/nfts');
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
        payload.setLoader(false);
    }
}

export function* watchAddNft() {
    yield takeLatest(ADD_NFT, addNftRequest);
}

function* updateNftRequest({ payload }) {
    let data = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        price: payload.price
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/nft/update`, data, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId,
                type: payload.type
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateNft() {
    yield takeLatest(UPDATE_NFT, updateNftRequest);
}

function* deleteNftRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/nft/delete/${payload.id}`, headers);
        payload.handleClose();
        yield put(
            getAllNft({
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId,
                type: payload.type,
                page: payload.page,
                limit: payload.limit
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteNft() {
    yield takeLatest(DELETE_NFT, deleteNftRequest);
}

function* changeStatusRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`/admin/nft/changeStatus/${payload.id}`,{}, headers);
        yield put(
            getAllNft({
                page: payload.page,
                limit: payload.limit,
                type: payload.type,
                brandId: payload.brandId,
                categoryId: payload.categoryId,
                subCategoryId: payload.subCategoryId
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeStatusNft() {
    yield takeLatest(CHANGE_STATUS, changeStatusRequest);
}

export default function* nftSaga() {
    yield all([
        fork(watchGetAllNft),
        fork(watchAddNft),
        fork(watchDeleteNft),
        fork(watchUpdateNft),
        fork(watchGetMintNft),
        fork(watchGetLazyMintNft),
        fork(watchChangeStatusNft),
        fork(watchGetAllNftForBunchMint),
        fork(watchTransferNft),
        fork(watchListNftOnMarketPlace),
        fork(watchGetAllNftForBunchTransfer),
        fork(watchGetAllNftForBunchListing),
        fork(watchChangeStatusInMarketplaceNft)
    ]);
}
