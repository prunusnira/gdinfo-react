import {createStore} from 'redux';
import TokenApp from '../reducer/index';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const enhancedReducer = persistReducer(persistConfig, TokenApp);

const configureStore = () => {
    const store = createStore(enhancedReducer);
    const persistor = persistStore(store);
    return {store, persistor};    
};

export default configureStore;