'use client';

import React from 'react';
import { selectForecast } from '../Store/slices/forecastSlice';
import { useAppSelector } from '../Store/hook';
import ShadChart from './ShadChart';

function Forecast() {
  const forecast = useAppSelector(selectForecast);
  let city: string;

  if (forecast.status === 'succeeded') {
    city = forecast.forecast.city.name;
  }

  return (
    <div>
      {
        // TODO add Loading and Error Components //
      }
      {forecast.status === 'loading' && <p>Loading...</p>}
      {forecast.status === 'failed' && <p>Error: {forecast.error}</p>}
      {forecast.status === 'succeeded' && (
        <div>
          <h2> {city} </h2>
          <div>
            <ShadChart
              city={city}
              dataType="temp"
              forecastData={forecast.forecast.list}
            />
            <ShadChart
              city={city}
              dataType="pressure"
              forecastData={forecast.forecast.list}
            />
            <ShadChart
              city={city}
              dataType="humidity"
              forecastData={forecast.forecast.list}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast;
