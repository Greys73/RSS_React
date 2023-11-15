/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 5,
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
