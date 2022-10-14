import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducers';

const store = configureStore({
  reducer: rootReducer,
});

export const getState = () => {
  return store.getState();
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
