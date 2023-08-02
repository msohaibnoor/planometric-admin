import produce from 'immer';
import { GET_ALL_PROJECTS_SUCCESS } from './constants';

const INITIAL_STATE = {
    projects: []
};

const projectsReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS_SUCCESS:
            draft.projects = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default projectsReducer;
