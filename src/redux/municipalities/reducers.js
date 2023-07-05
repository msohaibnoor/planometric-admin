import produce from 'immer';
import { GET_ALL_MUNICIPALITIES_SUCCESS } from './constants';

const INITIAL_STATE = {
    municipalities: []
};

const municipalitiesReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_MUNICIPALITIES_SUCCESS:
            draft.municipalities = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default municipalitiesReducer;
