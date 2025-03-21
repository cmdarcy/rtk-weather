import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { WeatherData } from '@/types/forecastTypes';

const APIKEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_APIKEY;

/**
 * Fetches the weather forecast based on the provided search term.
 * @param {string} searchTerm - The term to search for the forecast.
 * @returns {Promise<WeatherData>} The weather forecast data.
 * @throws {Error} If the fetch fails or the response is not ok.
 */
export const fetchForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (searchTerm: string): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${APIKEY}&units=imperial`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as WeatherData;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Fetch error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw error;
    }
  },
);

type ForecastState = {
  forecast: WeatherData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ForecastState = {
  forecast: null,
  status: 'idle',
  error: null,
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
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

/**
 * Selects the forecast from the state.
 * @param {RootState} state - The root state.
 * @returns {WeatherData | null} The forecast data.
 */
export const selectForecast = (state: RootState) => state.forecast;

export default forecastSlice.reducer;
