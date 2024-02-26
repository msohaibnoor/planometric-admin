import {
    GET_ALL_QUERIES,
    GET_ALL_QUERIES_SUCCESS,
    DELETE_QUERY
} from './constants';

export const getAllQueries = (data) => {
    return {
        type: GET_ALL_QUERIES,
        payload: data
    };
};

export const getAllQueriesSuccess = (data) => {
    return {
        type: GET_ALL_QUERIES_SUCCESS,
        payload: data
    };
};

export const deleteQuery = (data) => {
    return {
        type: DELETE_QUERY,
        payload: data
    };
};
