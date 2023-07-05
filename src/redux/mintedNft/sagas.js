import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllMintedNftSuccess, getAllSoldNftSuccess } from './actions';
import { GET_ALL_MINTED_NFT, GET_ALL_SOLD_NFT } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllSoldNftRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/marketPlace/getAllSoldedNfts?page=${payload.page}&size=${payload.limit}&categoryId=${payload.categoryId}&brandId=${payload.brandId}&subCategoryId=${payload.subCategoryId}&type=${payload.type}`,
            headers
        );
        yield put(getAllSoldNftSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllSoldNft() {
    yield takeLatest(GET_ALL_SOLD_NFT, getAllSoldNftRequest);
}

function* getAllMintedNftRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/marketPlace/getAll?page=${payload.page}&size=${payload.limit}&categoryId=${payload.categoryId}&brandId=${payload.brandId}&subCategoryId=${payload.subCategoryId}&type=${payload.type}`,
            headers
        );
        yield put(getAllMintedNftSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllMintedNft() {
    yield takeLatest(GET_ALL_MINTED_NFT, getAllMintedNftRequest);
}

export default function* mintedNftSaga() {
    yield all([fork(watchGetAllMintedNft), fork(watchGetAllSoldNft)]);
}
