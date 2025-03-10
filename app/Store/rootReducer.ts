import { combineReducers } from '@reduxjs/toolkit';

import forecastReducer from './slices/forecastSlice';

export const rootReducer = combineReducers({
  forecast: forecastReducer,
});
