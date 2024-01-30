import produce from 'immer';
import { GET_ALL_DATA_SUCCESS } from './constants';

const INITIAL_STATE = {
    clientData: {}
};

const dataReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_DATA_SUCCESS:
            draft.clientData = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default dataReducer;
