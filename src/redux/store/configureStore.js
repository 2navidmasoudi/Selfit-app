import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import reducers from '../reducers';

const config = {
  key: 'root',
  storage,
  whitelist: ['user']
};
const middleware = [];

if (__DEV__) { middleware.push(createLogger()); }

const persistedReducer = persistCombineReducers(config, reducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(persistedReducer, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  console.log(store.getState());
});
const configureStore = () => ({ persistor, store });

export default configureStore;
