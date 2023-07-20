import produce from 'immer';
import { GET_ALL_TESTIMONIALS_SUCCESS } from './constants';

const INITIAL_STATE = {
    testimonials: []
};

const testimonialsReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_TESTIMONIALS_SUCCESS:
            draft.testimonials = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default testimonialsReducer;
