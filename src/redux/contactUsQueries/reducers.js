import produce from 'immer';
import { GET_ALL_QUERIES_SUCCESS } from './constants';

const INITIAL_STATE = {
    queries: []
};

const queriesReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_QUERIES_SUCCESS:
            draft.queries = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default queriesReducer;
