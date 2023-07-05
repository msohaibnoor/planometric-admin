import rootReducer from './reducer';
import rootSaga from './sagas';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function configureStore(initialState) {
    const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
    sagaMiddleware.run(rootSaga);
    return store;
}
const store = configureStore();
const persistor = persistStore(store);
export { store, persistor };
