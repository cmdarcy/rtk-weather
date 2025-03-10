import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const APIKEY = `c8d0a8706ef69da2623e093b018f765f`;
export const fetchForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${APIKEY}&units=imperial`,
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error(
        `Failed to fetch response from api with search term: ${searchTerm}`,
      );
    } catch (error) {
      console.error(error.message);
    }
  },
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: { forecast: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default forecastSlice.reducer;
