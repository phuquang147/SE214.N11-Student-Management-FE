import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//
import infor from './infor';
//
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  infor,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
