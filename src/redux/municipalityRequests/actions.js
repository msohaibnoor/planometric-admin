import {
    GET_ALL_REQUESTS,
    GET_ALL_REQUESTS_SUCCESS,
    DELETE_REQUEST
} from './constants';

export const getAllRequests = (data) => {
    return {
        type: GET_ALL_REQUESTS,
        payload: data
    };
};

export const getAllRequestsSuccess = (data) => {
    return {
        type: GET_ALL_REQUESTS_SUCCESS,
        payload: data
    };
};

export const deleteRequest = (data) => {
    return {
        type: DELETE_REQUEST,
        payload: data
    };
};
