import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import app from './slices/appSlice';

const reducer = combineReducers({
  app,
});

export const store = configureStore({
  reducer,
});

export type State = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

// Shortcuts
export const dispatch: AppDispatch = store.dispatch.bind(store);
export const getState = store.getState.bind(store);

export default store;
