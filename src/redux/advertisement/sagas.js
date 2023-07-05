import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllSlots, getAllSlotsSuccess } from './actions';
import { GET_ALL_SLOTS, DELETE_SLOT, UPDATE_SLOT, CHANGE_SLOT_STATUS } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllSlotsRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/lobby/slot/allAdvertisements?page=${payload.page}&size=${payload.limit}&lobbieId=${payload.eventId}`,
            headers
        );
        yield put(getAllSlotsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllSlots() {
    yield takeLatest(GET_ALL_SLOTS, getAllSlotsRequest);
}

function* updateSlotRequest({ payload }) {
    const formData = new FormData();
    formData.append('lobbyId', payload.lobbyId);
    formData.append('slotNumber', payload.slotNumber);
    formData.append('adv', payload.adv);

    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/lobby/slot/editAdvertisement`, formData, headers);
        yield put(
            getAllSlots({
                eventId: payload.lobbyId,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.setLoader(false);
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
        payload.setLoader(false);
    }
}

export function* watchUpdateSlot() {
    yield takeLatest(UPDATE_SLOT, updateSlotRequest);
}

function* changeSlotStatusRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/lobby/slot/changeStatus/${payload.slotId}/${payload.eventId}`, headers);
        yield put(
            getAllSlots({
                eventId: payload.eventId,
                page: payload.page,
                limit: payload.limit
            })
        );

        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeSlotStatus() {
    yield takeLatest(CHANGE_SLOT_STATUS, changeSlotStatusRequest);
}

function* deleteSlotRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/lobby/slot/delete/${payload.eventId}/${payload.slotNumber}`, headers);
        yield put(
            getAllSlots({
                eventId: payload.eventId,
                page: payload.page,
                limit: payload.limit
            })
        );

        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteSlot() {
    yield takeLatest(DELETE_SLOT, deleteSlotRequest);
}

export default function* advertisementsSaga() {
    yield all([fork(watchGetAllSlots), fork(watchDeleteSlot), fork(watchChangeSlotStatus), fork(watchUpdateSlot)]);
}
