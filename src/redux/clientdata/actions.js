import { ADD_INSTRUCTION, GET_ALL_DATA, GET_ALL_DATA_SUCCESS, UPDATE_DATA, DELETE_INSTRUCTION } from './constants';

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

export const addInstruction = (data) => {
    console.log("adding instruction")
    return {
        type: ADD_INSTRUCTION,
        payload: data
    };
};

export const deleteInstruction = (data) => {
    return {
        type: DELETE_INSTRUCTION,
        payload: data
    };
};