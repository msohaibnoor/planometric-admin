import {
    GET_ALL_EVENTS,
    GET_ALL_EVENTS_SUCCESS,
    DELETE_EVENT,
    ADD_EVENT,
    UPDATE_EVENT,
    CHANGE_EVENT_STATUS,
    ADD_THEATER_CONTENT,
    GET_THEATER_CONTENT,
    GET_THEATER_CONTENT_SUCCESS
} from './constants';

export const addTheaterContent = (data) => {
    return {
        type: ADD_THEATER_CONTENT,
        payload: data
    };
};

export const getTheaterContent = (data) => {
    return {
        type: GET_THEATER_CONTENT,
        payload: data
    };
};

export const getTheaterContentSuccess = (data) => {
    return {
        type: GET_THEATER_CONTENT_SUCCESS,
        payload: data
    };
};

export const getAllEvents = (data) => {
    return {
        type: GET_ALL_EVENTS,
        payload: data
    };
};

export const getAllEventsSuccess = (data) => {
    return {
        type: GET_ALL_EVENTS_SUCCESS,
        payload: data
    };
};

export const addEvent = (data) => {
    return {
        type: ADD_EVENT,
        payload: data
    };
};
export const deleteEvent = (data) => {
    return {
        type: DELETE_EVENT,
        payload: data
    };
};

export const updateEvent = (data) => {
    return {
        type: UPDATE_EVENT,
        payload: data
    };
};

export const changeEventStatus = (data) => {
    return {
        type: CHANGE_EVENT_STATUS,
        payload: data
    };
};
