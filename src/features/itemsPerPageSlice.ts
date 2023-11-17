import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 5,
  data: [],
  isLoading: false,
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
    setItemsIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setItemsCount, setItemsData, setItemsIsLoading } =
  itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
