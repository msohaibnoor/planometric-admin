import produce from 'immer';
import { GET_ALL_REQUESTS_SUCCESS } from './constants';

const INITIAL_STATE = {
    requests: []
};

const requestsReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_REQUESTS_SUCCESS:
            draft.requests = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default requestsReducer;
