import { GET_ALL_DATA, GET_ALL_DATA_SUCCESS, UPDATE_DATA } from './constants';

export const getAllData = (data) => {
    return {
        type: GET_ALL_DATA,
        payload: data
    };
};

export const getAllDataSuccess = (data) => {
    return {
        type: GET_ALL_DATA_SUCCESS,
        payload: data
    };
};

export const updateData = (data) => {
    return {
        type: UPDATE_DATA,
        payload: data
    };
};
