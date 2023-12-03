import { createSlice } from '@reduxjs/toolkit';
import IFormData from '../../assets/types';

export const initialState: IFormData[] = [
  {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPass: '',
    gender: 'Male',
    accept: false,
    picture: '',
    country: 'Argentina',
  },
];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
