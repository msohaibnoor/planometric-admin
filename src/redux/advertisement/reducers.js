import produce from 'immer';
import { GET_ALL_SLOTS_SUCCESS } from './constants';

const INITIAL_STATE = {
    advertisementsList: []
};

const advertisementsReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_SLOTS_SUCCESS:
            draft.advertisementsList = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default advertisementsReducer;
