import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import reducers from '../reducers';

const middleware = [thunk];
middleware.push(createLogger());

const persistConfig = {
  key: 'main',
  storage,
  // blacklist: ['gym','buffet']
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
