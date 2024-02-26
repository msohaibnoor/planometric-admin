import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllQueries, getAllQueriesSuccess } from './actions';
import {
    DELETE_QUERY,
GET_ALL_QUERIES, 
GET_ALL_QUERIES_SUCCESS
} from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllQueriesRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/queries`, headers);
        yield put(getAllQueriesSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllQueries() {
    yield takeLatest(GET_ALL_QUERIES, getAllQueriesRequest);
}

function* deleteQueryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const { data } = yield axios.delete(`/admin/query/delete/${payload.id}`, headers);
        yield put(
            getAllQueries({
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

export function* watchDeleteQuery() {
    yield takeLatest(DELETE_QUERY, deleteQueryRequest);
}


export default function* usersSaga() {
    yield all([
        fork(watchGetAllQueries),
        fork(watchDeleteQuery),
    ]);
}
