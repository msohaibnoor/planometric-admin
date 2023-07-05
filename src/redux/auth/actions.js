import { LOGIN_SUCCESS, LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD, SET_LOADER,SET_WALLET_ADDRESS } from './constants';



export const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    };
};

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const forgotPassword = (data) => {
    return {
        type: FORGOT_PASSWORD,
        payload: data
    };
};
export const resetPassword = (data) => {
    return {
        type: RESET_PASSWORD,
        payload: data
    };
};

export const setLoader = (data) => {
    return {
        type: SET_LOADER,
        payload: data
    };
};

export const setWallet = (data) => {
    return {
        type: SET_WALLET_ADDRESS,
        payload: data
    };
};
