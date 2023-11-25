import { createSlice } from '@reduxjs/toolkit';

// const searchParams = new URLSearchParams(window.location.search);

const initialState = {
  id: null,
  data: null,
  isLoading: false,
};

const curItemSlice = createSlice({
  name: 'curItem',
  initialState,
  reducers: {
    setCurItemId: (state, action) => {
      state.id = action.payload;
    },
    setCurItemData: (state, action) => {
      state.data = action.payload;
    },
    setCurItemIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurItemData, setCurItemId, setCurItemIsLoading } =
  curItemSlice.actions;
export default curItemSlice.reducer;
