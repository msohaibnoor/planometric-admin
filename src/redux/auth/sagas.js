import axios from 'utils/axios';
import { all, fork, put, takeLatest, select } from 'redux-saga/effects';
import { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from 'redux/auth/constants';
import { loginSuccess, setLoader } from './actions';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { SetNotification } from 'shared/helperMethods/setNotification';

function* loginUser({ payload }) {
    try {
        let data = {
            email: payload.email,
            password: payload.password
        };
        const response = yield axios.post(`/auth/login`, data);
        yield put(setLoader(false));
        yield SetNotification('success', response.data.message);
        yield put(loginSuccess(response.data.data));
    } catch (error) {
        yield put(setLoader(false));
        yield sagaErrorHandler(error.response.data.data);
    }
}

function* forgetPasswordRequest({ payload }) {
    try {
        let data = {
            email: payload.email
        };
        const response = yield axios.post(`/admin/forgetPassword`, data);
        yield SetNotification('success', response.data.message);
        payload.navigate('/');
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

function* resetPasswordRequest({ payload }) {
    try {
        let data = {
            newPassword: payload.password,
            token: payload.token
        };
        const response = yield axios.put(`/admin/resetPassword`, data);
        yield SetNotification('success', response.data.message);
        payload.navigate('/');
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN, loginUser);
}

export function* watchForgetPassword() {
    yield takeLatest(FORGOT_PASSWORD, forgetPasswordRequest);
}
export function* watchResetPassword() {
    yield takeLatest(RESET_PASSWORD, resetPasswordRequest);
}
export default function* authSaga() {
    yield all([fork(watchLogin), fork(watchForgetPassword), fork(watchResetPassword)]);
}
