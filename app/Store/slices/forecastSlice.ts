import { createSlice } from '@reduxjs/toolkit';

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: { forecast: [] },
  reducers: {},
});

export default forecastSlice.reducer;
