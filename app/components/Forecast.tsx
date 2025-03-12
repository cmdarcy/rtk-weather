'use client';

import React from 'react';
import Chart from './Chart';
import {
  ForecastDataPoint,
  selectForecast,
} from '../Store/slices/forecastSlice';
import { useAppSelector } from '../Store/hook';

function Forecast() {
  const forecast = useAppSelector(selectForecast);
  let tempForecasts: null | number[] = null;
  let pressureForecasts: null | number[] = null;
  let humidityForecasts: null | number[] = null;
  let city: null | string = null;

  if (forecast.status === 'succeeded') {
    city = forecast.forecast.city.name;
    tempForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.temp,
    );
    pressureForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.pressure,
    );
    humidityForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.humidity,
    );
  }

  return (
    <div>
      {forecast.status === 'loading' && <p>Loading...</p>}
      {forecast.status === 'failed' && <p>Error: {forecast.error}</p>}
      {forecast.status === 'succeeded' && (
        <div>
          <h2> {city} </h2>
          <div>
            <Chart
              title="Temperature"
              forecastData={tempForecasts}
              units="°F"
            />
            <Chart
              title="Pressure"
              forecastData={pressureForecasts}
              units="hPa"
            />
            <Chart
              title="Humidity"
              forecastData={humidityForecasts}
              units="%"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast;
