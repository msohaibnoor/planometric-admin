import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllUsersSuccess, getAllUsers, getAllTestimonials, getAllTestimonialsSuccess, addTestimonial } from './actions';
import { GET_ALL_TESTIMONIALS, DELETE_TESTIMONIAL, UPDATE_TESTIMONIAL, CHANGE_USER_STATUS, ADD_TESTIMONIAL } from './constants';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* getAllTestimonialsRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };

        const response = yield axios.get(`admin/testimonials`, headers);
        yield put(getAllTestimonialsSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllTestimonials() {
    yield takeLatest(GET_ALL_TESTIMONIALS, getAllTestimonialsRequest);
}

function* updateTestimonialRequest({ payload }) {
    let data = {
        id: payload.id,
        feedbackText: payload?.feedbackText,
        clientName: payload?.clientName,
        clientDesignation: payload?.clientDesignation,
        clientImageUrl: payload?.clientImageUrl
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/testimonials/update`, data, headers);
        yield put(
            getAllTestimonials({
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

export function* watchUpdateTestimonialRequest() {
    yield takeLatest(UPDATE_TESTIMONIAL, updateTestimonialRequest);
}

function* deleteTestimonialRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const { data } = yield axios.delete(`/admin/testimonials/delete/${payload.id}`, headers);
        yield put(
            getAllTestimonials({
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

export function* watchDeleteTestimonial() {
    yield takeLatest(DELETE_TESTIMONIAL, deleteTestimonialRequest);
}

function* addTestimonialRequest({ payload }) {
    const data = {
        feedbackText: payload?.feedbackText,
        clientName: payload?.clientName,
        clientDesignation: payload?.clientDesignation,
        clientImageUrl: payload?.clientImageUrl
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`/admin/testimonials/add`, data, headers);
        yield put(
            getAllTestimonials({
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

export function* watchAddTestimonial() {
    yield takeLatest(ADD_TESTIMONIAL, addTestimonialRequest);
}

export default function* usersSaga() {
    yield all([
        fork(watchGetAllTestimonials),
        fork(watchDeleteTestimonial),
        fork(watchUpdateTestimonialRequest),
        fork(watchAddTestimonial)
    ]);
}
