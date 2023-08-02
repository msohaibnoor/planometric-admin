import { GET_ALL_PROJECTS, GET_ALL_PROJECTS_SUCCESS } from './constants';

export const getAllProjects = (data) => {
    return {
        type: GET_ALL_PROJECTS,
        payload: data
    };
};

export const getAllProjectsSuccess = (data) => {
    return {
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: data
    };
};
