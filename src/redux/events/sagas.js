import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllEvents, getAllEventsSuccess, getTheaterContentSuccess } from './actions';
import { GET_ALL_EVENTS, DELETE_EVENT, ADD_EVENT, UPDATE_EVENT, CHANGE_EVENT_STATUS, ADD_THEATER_CONTENT } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* addTheaterContentRequest({ payload }) {
    console.log('payload', payload);
    const formData = new FormData();
    formData.append('lobbyId', payload.eventId);
    formData.append('url', payload.url);
    formData.append('isLive', payload.isLive);

    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/theater/addContent`, formData, headers);
        console.log('response', response);
        payload.setTheaterData(response.data.data.theater);
        yield put(
            getAllEvents({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.setLoader(false);
        payload.handleReset();
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        payload.setLoader(false);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddTheaterContent() {
    yield takeLatest(ADD_THEATER_CONTENT, addTheaterContentRequest);
}

function* getAllEventsRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `admin/lobby/getAllLobbies?size=${payload.limit}&page=${payload.page}&search=${payload.search}&type=event`,
            headers
        );
        yield put(getAllEventsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllEvents() {
    yield takeLatest(GET_ALL_EVENTS, getAllEventsRequest);
}
function* deleteEventRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`/admin/lobby/delete/${payload.id}`, headers);
        yield put(
            getAllEvents({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteEvent() {
    yield takeLatest(DELETE_EVENT, deleteEventRequest);
}

function* addEventRequest({ payload }) {
    console.log('payload', payload);
    const formData = new FormData();
    formData.append('lobbyName', payload.lobbyName);
    formData.append('ticketPrice', payload.ticketPrice);
    formData.append('currencyType', payload.currencyType);
    formData.append('description', payload.description);
    formData.append('collectionAddress', payload.collectionAddress);
    formData.append('image', payload.image);
    formData.append('brandId', payload.brandId);
    formData.append('startTime', payload.startTime);
    formData.append('endTime', payload.endTime);
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin/lobby/createLobby`, formData, headers);
        console.log('response', response);
        yield put(
            getAllEvents({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        payload.setLoader(false);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddEvent() {
    yield takeLatest(ADD_EVENT, addEventRequest);
}

function* updateEventRequest({ payload }) {
    const formData = new FormData();
    formData.append('id', payload.id);
    formData.append('lobbyName', payload.lobbyName);
    formData.append('ticketPrice', payload.ticketPrice);
    formData.append('currencyType', payload.currencyType);
    formData.append('description', payload.description);
    formData.append('collectionAddress', payload.collectionAddress);
    formData.append('image', payload.image);
    formData.append('brandId', payload.brandId);
    formData.append('startTime', payload.startTime);
    formData.append('endTime', payload.endTime);
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/lobby/editLobby`, formData, headers);
        yield put(
            getAllEvents({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );
        payload.handleClose();
        yield SetNotification('success', response.data.message);
    } catch (error) {
        payload.setLoader(false);
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateEvent() {
    yield takeLatest(UPDATE_EVENT, updateEventRequest);
}

function* changeEventStatusRequest({ payload }) {
    console.log('fkffkfk');
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin/lobby/eventIsActive/${payload.id}`, headers);
        yield put(
            getAllEvents({
                search: payload.search,
                page: payload.page,
                limit: payload.limit
            })
        );

        yield SetNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeEventStatus() {
    yield takeLatest(CHANGE_EVENT_STATUS, changeEventStatusRequest);
}
export default function* eventsSaga() {
    yield all([
        fork(watchAddTheaterContent),
        fork(watchGetAllEvents),
        fork(watchDeleteEvent),
        fork(watchAddEvent),
        fork(watchChangeEventStatus),
        fork(watchUpdateEvent)
    ]);
}
