import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 5,
  data: [],
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsCount: (state, action) => {
      state.count = action.payload;
    },
    setItemsData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setItemsCount, setItemsData } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
