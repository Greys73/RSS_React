import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import formDataSlice from './features/formDataSlice';

export const rootReducer = combineReducers({
  formData: formDataSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
