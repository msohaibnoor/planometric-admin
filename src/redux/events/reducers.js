import produce from 'immer';
import { GET_ALL_EVENTS_SUCCESS, GET_THEATER_CONTENT_SUCCESS } from './constants';

const INITIAL_STATE = {
    eventsList: [],
    theaterContent: null
};

const eventsReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS_SUCCESS:
            draft.eventsList = action.payload;
            break;
        case GET_THEATER_CONTENT_SUCCESS:
            draft.theaterContent = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default eventsReducer;
