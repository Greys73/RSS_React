import { createSlice } from '@reduxjs/toolkit';

const searchParams = new URLSearchParams(window.location.search);

const initialState = {
  value: searchParams.get('search') || '',
};

const searchStringSlice = createSlice({
  name: 'searchString',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchString } = searchStringSlice.actions;
export default searchStringSlice.reducer;
