import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { productApi } from '../model/apiRoot';
import { createWrapper } from 'next-redux-wrapper';

import searchStringSlice from '../features/searchStringSlice';
import itemsPerPageSlice from '../features/itemsPerPageSlice';
import curItemSlice from '../features/curItemSlice';
import viewModeSlice from '../features/viewModeSlice';

export const rootReducer = combineReducers({
  curItem: curItemSlice,
  searchString: searchStringSlice,
  itemsPerPage: itemsPerPageSlice,
  viewMode: viewModeSlice,
  [productApi.reducerPath]: productApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidlleware) =>
      getDefaultMidlleware().concat(productApi.middleware),
  });
};

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
