/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  curItem: null,
};

const viewModeSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
  },
});

export const { setCurItem } = viewModeSlice.actions;
export default viewModeSlice.reducer;
