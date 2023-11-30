import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Jonh Doe',
  age: 18,
  email: 'john@mail.com',
  password: 'qwerty',
  gender: 'male',
  accept: false,
  picture: '',
  countru: 'Moscow',
};

const formDataSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = formDataSlice.actions;
export default formDataSlice.reducer;
