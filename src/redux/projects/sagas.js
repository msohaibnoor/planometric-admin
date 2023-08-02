import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllProjects, getAllProjectsSuccess } from './actions';
import { GET_ALL_PROJECTS, GET_ALL_PROJECTS_SUCCESS } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllProjectsRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };

        const response = yield axios.get(`admin/projects`, headers);
        yield put(getAllProjectsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllProjects() {
    yield takeLatest(GET_ALL_PROJECTS, getAllProjectsRequest);
}

export default function* usersSaga() {
    yield all([fork(watchGetAllProjects)]);
}
