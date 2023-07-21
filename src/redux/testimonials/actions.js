import {
    GET_ALL_TESTIMONIALS,
    GET_ALL_TESTIMONIALS_SUCCESS,
    DELETE_TESTIMONIAL,
    ADD_TESTIMONIAL,
    ADD_RESTRICTED_TESTIMONIAL,
    CHANGE_TESTIMONIAL_STATUS,
    UPDATE_TESTIMONIAL
} from './constants';

export const getAllTestimonials = (data) => {
    return {
        type: GET_ALL_TESTIMONIALS,
        payload: data
    };
};

export const getAllTestimonialsSuccess = (data) => {
    return {
        type: GET_ALL_TESTIMONIALS_SUCCESS,
        payload: data
    };
};

export const updateTestimonial = (data) => {
    return {
        type: UPDATE_TESTIMONIAL,
        payload: data
    };
};
export const deleteTestimonial = (data) => {
    return {
        type: DELETE_TESTIMONIAL,
        payload: data
    };
};

export const addTestimonial = (data) => {
    return {
        type: ADD_TESTIMONIAL,
        payload: data
    };
};

export const addRestrictedTestimonial = (data) => {
    return {
        type: ADD_RESTRICTED_TESTIMONIAL,
        payload: data
    };
};

export const changeTestimonialStatus = (data) => {
    return {
        type: CHANGE_TESTIMONIAL_STATUS,
        payload: data
    };
};
