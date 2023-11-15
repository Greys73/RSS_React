/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
// Slices
import searchStringSlice from '../features/searchStringSlice';
import itemsPerPageSlice from '../features/itemsPerPageSlice';
import viewModeSlice from '../features/viewModeSlice';

const store = configureStore({
  reducer: {
    searchString: searchStringSlice,
    itemsPerPage: itemsPerPageSlice,
    viewMode: viewModeSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
