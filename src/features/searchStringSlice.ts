/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  storageName: 'RSS_React_SearchProductQuery',
};

const searchStringSlice = createSlice({
  name: 'searchString',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.value = action.payload;
    },
    getFromStorage: (state, action) => {
      if (state.storageName) {
        state.value = localStorage.getItem(state.storageName) || action.payload;
      }
    },
    setStorageName: (state, action) => {
      state.storageName = action.payload;
    },
  },
});

export const { setSearchString, getFromStorage, setStorageName } =
  searchStringSlice.actions;
export default searchStringSlice.reducer;
