import axios from 'utils/axios';
import { all, call, fork, put, retry, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from '../../shared/helperMethods/Selectors';
import { getAllUsersSuccess, getAllUsers, getAllTestimonials, getAllTestimonialsSuccess } from './actions';
import { GET_ALL_TESTIMONIALS, ADD_GUEST_USER, DELETE_TESTIMONIAL, CHANGE_USER_STATUS, ADD_RESTRICTED_USER } from './constants';
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

// function* addGuestUserRequest({ payload }) {
//     let data = {
//         walletAddress: payload.walletAddress
//     };
//     try {
//         const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
//         const response = yield axios.post(`admin/users/guest`, data, headers);
//         yield put(
//             getAllUsers({
//                 search: payload.search,
//                 page: payload.page,
//                 limit: payload.limit,
//                 type: payload.type
//             })
//         );
//         payload.handleClose();
//         yield SetNotification('success', response.data.message);
//     } catch (error) {
//         yield sagaErrorHandler(error.response.data.data);
//     }
// }

// export function* watchAddGuestUser() {
//     yield takeLatest(ADD_GUEST_USER, addGuestUserRequest);
// }

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

// function* changeStatusRequest({ payload }) {
//     try {
//         const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
//         const response = yield axios.put(`/admin/users/status/${payload.id}`, {}, headers);
//         yield put(
//             getAllUsers({
//                 search: payload.search,
//                 page: payload.page,
//                 limit: payload.limit,
//                 type: payload.type
//             })
//         );
//         yield SetNotification('success', response.data.message);
//     } catch (error) {
//         yield sagaErrorHandler(error.response.data.data);
//     }
// }

// export function* watchChangeStatus() {
//     yield takeLatest(CHANGE_USER_STATUS, changeStatusRequest);
// }

export default function* usersSaga() {
    yield all([fork(watchGetAllTestimonials), fork(watchDeleteTestimonial)]);
}
