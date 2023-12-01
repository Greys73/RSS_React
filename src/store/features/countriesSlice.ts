import { createSlice } from '@reduxjs/toolkit';
import countries from '../../assets/countries';

export const initialState: string[] = countries.map((val) => val.name);

const countriesSlice = createSlice({
  name: 'countriesList',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
