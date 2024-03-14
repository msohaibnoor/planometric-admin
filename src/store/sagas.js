import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/sagas';
import municipalitiesSaga from '../redux/municipalities/sagas';
import testimonialsSaga from '../redux/testimonials/sagas';
import queriesSaga from '../redux/contactUsQueries/sagas';
import requestsSaga from '../redux/municipalityRequests/sagas';
import projectsSaga from '../redux/projects/sagas';
import clientDataSaga from '../redux/clientdata/sagas';
import superAdminDashboardSaga from '../redux/dashboard/sagas';
import usersSaga from '../redux/users/sagas';
import marketPlaceSaga from '../redux/marketPlace/sagas';
import nftSaga from '../redux/nft/sagas';
import eventsSaga from '../redux/events/sagas';
import advertisementsSaga from '../redux/advertisement/sagas';
import mintedNftSaga from '../redux/mintedNft/sagas';

export default function* rootSaga() {
    yield all([
        authSaga(),
        usersSaga(),
        superAdminDashboardSaga(),
        marketPlaceSaga(),
        nftSaga(),
        eventsSaga(),
        advertisementsSaga(),
        mintedNftSaga(),
        municipalitiesSaga(),
        testimonialsSaga(),
        projectsSaga(),
        clientDataSaga(),
        queriesSaga(),
        requestsSaga()
    ]);
}
