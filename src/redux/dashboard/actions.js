import { GET_SUPER_ADMIN_DASHBOARD,GET_SUPER_ADMIN_DASHBOARD_SUCCESS } from './constants';

export const getDashboardData = () => {
    return {
        type: GET_SUPER_ADMIN_DASHBOARD,
       
    };
};
export const getDashboardDataSuccess = (data) => {
    return {
        type: GET_SUPER_ADMIN_DASHBOARD_SUCCESS,
        payload: data
    };
};

