import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { productApi } from '../model/apiRoot';
// Slices
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

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMidlleware) =>
      getDefaultMidlleware().concat(productApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
