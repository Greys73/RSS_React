import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../model/apiRoots';
// Slices
import searchStringSlice from '../features/searchStringSlice';
import itemsPerPageSlice from '../features/itemsPerPageSlice';
import curItemSlice from '../features/curItemSlice';
import viewModeSlice from '../features/viewModeSlice';

const store = configureStore({
  reducer: {
    curItem: curItemSlice,
    searchString: searchStringSlice,
    itemsPerPage: itemsPerPageSlice,
    viewMode: viewModeSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMidlleware) =>
    getDefaultMidlleware().concat(productApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
