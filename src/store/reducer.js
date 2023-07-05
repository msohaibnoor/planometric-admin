import { combineReducers } from 'redux';
import customizationReducer from './themeReducers/customizationReducer';
import snackbarReducer from './themeReducers/snackbarReducer';
import cartReducer from './themeReducers/cartReducer';
import kanbanReducer from './themeReducers/kanbanReducer';
import AuthReducer from 'redux/auth/reducers';
import superAdminDashboard from 'redux/dashboard/reducers';
import usersReducer from 'redux/users/reducers';
import municipalitiesReducer from 'redux/municipalities/reducers';
import marketPlaceReducer from 'redux/marketPlace/reducers';
import nftReducer from 'redux/nft/reducers';
import eventsReducer from '../redux/events/reducers';
import advertisementsReducer from '../redux/advertisement/reducers';
import mintedNftReducer from '../redux/mintedNft/reducers';
// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    cart: cartReducer,
    kanban: kanbanReducer,
    //Website Reducer
    auth: AuthReducer,
    users: usersReducer,
    superAdminDashboard: superAdminDashboard,
    marketPlace: marketPlaceReducer,
    nft: nftReducer,
    events: eventsReducer,
    advertisements: advertisementsReducer,
    mintedNft: mintedNftReducer,
    municipalities: municipalitiesReducer
});

export default rootReducer;
