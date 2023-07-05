import {
    GET_ALL_MUNICIPALITIES,
    GET_ALL_MUNICIPALITIES_SUCCESS,
    DELETE_USER,
    ADD_GUEST_USER,
    ADD_RESTRICTED_USER,
    CHANGE_USER_STATUS
} from './constants';

export const getAllMunicipalities = (data) => {
    return {
        type: GET_ALL_MUNICIPALITIES,
        payload: data
    };
};

export const getAllMunicipalitiesSuccess = (data) => {
    return {
        type: GET_ALL_MUNICIPALITIES_SUCCESS,
        payload: data
    };
};

export const deleteUser = (data) => {
    return {
        type: DELETE_USER,
        payload: data
    };
};

export const addGuestUser = (data) => {
    return {
        type: ADD_GUEST_USER,
        payload: data
    };
};

export const addRestrictedUser = (data) => {
    return {
        type: ADD_RESTRICTED_USER,
        payload: data
    };
};

export const changeUserStatus = (data) => {
    return {
        type: CHANGE_USER_STATUS,
        payload: data
    };
};
