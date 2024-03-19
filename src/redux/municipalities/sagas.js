import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { deleteMunicipality, getAllMunicipalitiesSuccess, getAllMunicipalities } from './actions';
import {
    GET_ALL_MUNICIPALITIES,
    ADD_GUEST_USER,
    DELETE_USER,
    DELETE_MUNICIPALITY,
    CHANGE_USER_STATUS,
    ADD_RESTRICTED_USER,
    ADD_MUNICIPALITy,
    UPDATE_MUNICIPALITy
} from './constants';
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

function* getAllMunicipalitiesRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        // const response = yield axios.get(
        //     `admin/users/get?size=${payload.limit}&page=${payload.page}&search=${payload.search}&type=${payload.type}`,
        //     headers
        // );
        const response = yield axios.get(`admin/municipalities`, headers);
        yield put(getAllMunicipalitiesSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllMunicipalities() {
    yield takeLatest(GET_ALL_MUNICIPALITIES, getAllMunicipalitiesRequest);
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
function* addMunicipalityRequest({ payload }) {
    let data = {
        name: payload.name,
        state: payload.state,
        availability: payload.availability
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/municipalities/add`, data, headers);
        yield put(
            getAllMunicipalities({
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

function* updateMunicipalityRequest({ payload }) {
    let data = {
        id: payload.id,
        name: payload.name,
        state: payload.state,
        availability: payload.availability
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/municipalities/update`, data, headers);
        yield put(
            getAllMunicipalities({
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
export function* watchAddMunicipality() {
    yield takeLatest(ADD_MUNICIPALITy, addMunicipalityRequest);
}

export function* watchUpdateMunicipality() {
    yield takeLatest(UPDATE_MUNICIPALITy, updateMunicipalityRequest);
}

function* deleteMunicipalityRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/municipalities/delete/${payload.id}`, headers);
        yield put(
            getAllMunicipalities({
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

export function* watchDeleteMunicipality() {
    yield takeLatest(DELETE_MUNICIPALITY, deleteMunicipalityRequest);
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
        fork(watchGetAllMunicipalities),
        fork(watchAddGuestUser),
        fork(watchDeleteMunicipality),
        fork(watchChangeStatus),
        fork(watchAddRestrictedUser),
        fork(watchAddMunicipality),
        fork(watchUpdateMunicipality)
    ]);
}
