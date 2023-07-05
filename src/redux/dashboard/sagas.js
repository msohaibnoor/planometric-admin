import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { GET_SUPER_ADMIN_DASHBOARD } from './constants';
import { getDashboardDataSuccess } from './actions';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from 'store/Selector';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getDashboardDataRequest() {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`/admin/getAllDashboardData`, headers);
        yield put(getDashboardDataSuccess(response.data.data));
    } catch (error) {
        // yield sagaErrorHandler(error.response.data);
        console.log(error);
    }
}

export function* WatchDashboardData() {
    yield takeLatest(GET_SUPER_ADMIN_DASHBOARD, getDashboardDataRequest);
}

export default function* superAdminDashboardSaga() {
    yield all([fork(WatchDashboardData)]);
}
