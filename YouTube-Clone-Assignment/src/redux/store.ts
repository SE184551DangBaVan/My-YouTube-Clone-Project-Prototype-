import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/reducers'; // Combine all reducers
import rootSaga from './sagas/sagas'; // Combine all sagas

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with reducer, middleware, and saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to avoid potential issues with non-serializable data like errors or Firebase objects
      
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;