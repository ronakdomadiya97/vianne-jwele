// import { createStore, applyMiddleware } from 'redux'
// import rootReducer from './rootReducer';

// const store = createStore(rootReducer, applyMiddleware(thunk))

// export default store;

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk'

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // key for the localStorage object
  storage, // storage engine to use
  // Optionally, you can whitelist specific reducers to be persisted
  // whitelist: ['reducer1', 'reducer2']
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor object
const persistor = persistStore(store);

export { store, persistor };
