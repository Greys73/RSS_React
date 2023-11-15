/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import searchStringSlice from '../features/searchStringSlice';

const store = configureStore({
  reducer: {
    searchString: searchStringSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
