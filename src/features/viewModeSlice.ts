import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  data: null,
};

const viewModeSlice = createSlice({
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

export const { setCurItemData, setCurItemId } = viewModeSlice.actions;
export default viewModeSlice.reducer;
