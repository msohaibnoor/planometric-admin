import produce from 'immer';
import { GET_ALL_USERS_SUCCESS } from './constants';

const INITIAL_STATE = {
    usersList: []
};

const usersReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_USERS_SUCCESS:
            draft.usersList = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default usersReducer;
