import { createSlice } from '@reduxjs/toolkit';
import IFormData from '../../assets/types';

export const initialState: IFormData[] = [
  {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPass: '',
    gender: '',
    accept: false,
    picture: '',
    country: '',
  },
];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setData } = formDataSlice.actions;
export default formDataSlice.reducer;
