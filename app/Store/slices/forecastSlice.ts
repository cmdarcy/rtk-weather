import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const APIKEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_APIKEY;

export type ForecastDataPoint = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  clouds: { all: number };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
};

export type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastDataPoint[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

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

export const selectForecast = (state: RootState) => state.forecast;

export default forecastSlice.reducer;
