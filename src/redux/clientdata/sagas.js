import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllDataSuccess, getAllData } from './actions';
import { GET_ALL_DATA, GET_ALL_DATA_SUCCESS, UPDATE_DATA } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllDataRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };

        const response = yield axios.get(`admin/web/data`, headers);
        yield put(getAllDataSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllData() {
    yield takeLatest(GET_ALL_DATA, getAllDataRequest);
}

function* updateDataRequest({ payload }) {
    let data = {
        id: payload.id,
        businessDesc: payload.businessDesc,
        businessInformation: payload.businessInformation,
        costDescription: payload.costDescription,
        planometricPlanFee: payload.planometricPlanFee
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/web/data`, data, headers);
        yield put(
            getAllData({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.handleClose();
        payload.setLoader(false);
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateDataRequest() {
    yield takeLatest(UPDATE_DATA, updateDataRequest);
}

export default function* usersSaga() {
    yield all([fork(watchGetAllData), fork(watchUpdateDataRequest)]);
}
