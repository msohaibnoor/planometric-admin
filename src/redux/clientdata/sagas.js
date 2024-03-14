import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllDataSuccess, getAllData } from './actions';
import { ADD_INSTRUCTION, DELETE_INSTRUCTION, GET_ALL_DATA, GET_ALL_DATA_SUCCESS, UPDATE_DATA } from './constants';
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
    console.log("payloadsssssssssssssssssss");
    console.log(payload);
    let data = {
        id: payload.id,
        businessDesc: payload.businessDesc,
        businessInformation: payload.businessInformation,
        costDescription: payload.costDescription,
        planometricPlanFee: payload.planometricPlanFee,
        stripeText: payload.stripeText,
        createPlanInstruction1: payload.createPlanInstruction1,
        createPlanInstruction2: payload.createPlanInstruction2,
        createPlanInstruction3: payload.createPlanInstruction3,
        howItWorksStep1: payload.howItWorksStep1,
        howItWorksStep1Green: payload.howItWorksStep1Green,
        howItWorksStep2: payload.howItWorksStep2,
        howItWorksStep2Green: payload.howItWorksStep2Green,
        howItWorksStep3: payload.howItWorksStep3,
        howItWorksStep3Green: payload.howItWorksStep3Green,
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

function* addInstructionRequest({ payload }) {
    console.log({payload})
    const data = {
        instruction: payload?.instruction,
        id: payload?.id,
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`/admin/web/data/instruction`, data, headers);
        yield put(
            getAllData({
                search: payload.search,
                page: payload.page,
                limit: payload.limit,
                type: payload.type
            })
        );
        payload.setLoader(false);
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        console.log(error)
        yield sagaErrorHandler(error);
        // yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddInstruction() {
    yield takeLatest(ADD_INSTRUCTION, addInstructionRequest);
}

function* deleteInstructionRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const { data } = yield axios.delete(`/admin/web/data/instruction/${payload.id}`, headers);
        yield put(
            getAllData({
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

export function* watchDeleteInstruction() {
    yield takeLatest(DELETE_INSTRUCTION, deleteInstructionRequest);
}

export default function* usersSaga() {
    yield all([fork(watchGetAllData), fork(watchUpdateDataRequest), fork(watchAddInstruction), fork(watchDeleteInstruction)]);
}
