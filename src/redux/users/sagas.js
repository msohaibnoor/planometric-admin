import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllUsersSuccess, getAllUsers } from './actions';
import { GET_ALL_USERS, ADD_GUEST_USER, DELETE_USER, CHANGE_USER_STATUS, ADD_RESTRICTED_USER } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* addRestrictedUserRequest({ payload }) {
    try {
        const data = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/users/blockUser/${payload.walletAddress}`, data, {
            headers: {
                Authorization: `Bearer ${yield select(makeSelectAuthToken())}`
            }
        });
        yield put(
            getAllUsers({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddRestrictedUser() {
    yield takeLatest(ADD_RESTRICTED_USER, addRestrictedUserRequest);
}

function* getAllUsersRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        // const response = yield axios.get(
        //     `admin/users/get?size=${payload.limit}&page=${payload.page}&search=${payload.search}&type=${payload.type}`,
        //     headers
        // );
        const response = yield axios.get(
            `admin/users`,
            headers
        );
        yield put(getAllUsersSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllUsers() {
    yield takeLatest(GET_ALL_USERS, getAllUsersRequest);
}

function* addGuestUserRequest({ payload }) {
    let data = {
        walletAddress: payload.walletAddress
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/users/guest`, data, headers);
        yield put(
            getAllUsers({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddGuestUser() {
    yield takeLatest(ADD_GUEST_USER, addGuestUserRequest);
}

function* deleteUserRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/users/delete/${payload.id}`, headers);
        yield put(
            getAllUsers({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteUser() {
    yield takeLatest(DELETE_USER, deleteUserRequest);
}

function* changeStatusRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`/admin/users/status/${payload.id}`, {}, headers);
        yield put(
            getAllUsers({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeStatus() {
    yield takeLatest(CHANGE_USER_STATUS, changeStatusRequest);
}

export default function* usersSaga() {
    yield all([
        fork(watchGetAllUsers),
        fork(watchAddGuestUser),
        fork(watchDeleteUser),
        fork(watchChangeStatus),
        fork(watchAddRestrictedUser)
    ]);
}
