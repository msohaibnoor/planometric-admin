import produce from 'immer';
import { GET_SUPER_ADMIN_DASHBOARD_SUCCESS } from './constants';

const INITIAL_STATE = {
    dashboardData: [],
    
};

const superAdminDashboard = produce((draft, action) => {
    switch (action?.type) {
        case GET_SUPER_ADMIN_DASHBOARD_SUCCESS:
            draft.dashboardData = action.payload;
            break;
      

        default:
    }
}, INITIAL_STATE);

export default superAdminDashboard;
