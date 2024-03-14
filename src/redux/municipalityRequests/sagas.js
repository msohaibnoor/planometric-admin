import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { deleteRequest, getAllRequests, getAllRequestsSuccess } from './actions';
import {
    DELETE_REQUEST,
GET_ALL_REQUESTS, 
GET_ALL_REQUESTS_SUCCESS
} from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/requests`, headers);
        yield put(getAllRequestsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllRequests() {
    yield takeLatest(GET_ALL_REQUESTS, getAllRequest);
}

function* deleteMunicipalityRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const { data } = yield axios.delete(`/admin/requests/${payload.id}`, headers);
        yield put(
            getAllRequests({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.handleClose();
        console.log(data);
        yield SetNotification('success', data.data.message);
    } catch (error) {
        console.log(error);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteRequest() {
    yield takeLatest(DELETE_REQUEST, deleteMunicipalityRequest);
}


export default function* requestsSaga() {
    yield all([
        fork(watchGetAllRequests),
        fork(watchDeleteRequest),
    ]);
}
