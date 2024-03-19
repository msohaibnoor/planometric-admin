import {
    GET_ALL_MUNICIPALITIES,
    GET_ALL_MUNICIPALITIES_SUCCESS,
    DELETE_MUNICIPALITY,
    ADD_GUEST_USER,
    ADD_MUNICIPALITy,
    CHANGE_USER_STATUS,
    UPDATE_MUNICIPALITy
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

export const deleteMunicipality = (data) => {
    return {
        type: DELETE_MUNICIPALITY,
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
export const addMunicipality = (data) => {
    return {
        type: ADD_MUNICIPALITy,
        payload: data
    };
};

export const updateMunicipality = (data) => {
    return {
        type: UPDATE_MUNICIPALITy,
        payload: data
    };
};
