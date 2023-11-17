import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  data: null,
};

const curItemSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setCurItemId: (state, action) => {
      state.id = action.payload;
    },
    setCurItemData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCurItemData, setCurItemId } = curItemSlice.actions;
export default curItemSlice.reducer;
