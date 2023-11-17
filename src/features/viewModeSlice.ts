import { createSlice } from '@reduxjs/toolkit';

const searchParams = new URLSearchParams(window.location.search);

const initialState = {
  curPage: Number(searchParams.get('page')) || 1,
  pagesCount: 1,
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setCurPage: (state, action) => {
      state.curPage = action.payload;
    },
    setPagesCount: (state, action) => {
      state.pagesCount = action.payload;
    },
  },
});

export const { setCurPage, setPagesCount } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
