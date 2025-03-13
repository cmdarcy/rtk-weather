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
    <div className="mt-7">
      {
        // TODO add Loading and Error Components //
      }
      {forecast.status === 'loading' && <p>Loading...</p>}
      {forecast.status === 'failed' && <p>Error: {forecast.error}</p>}
      {forecast.status === 'succeeded' && (
        <div className="w-screen px-24">
          <h2 className=" text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {city}
          </h2>
          <div className="flex flex-col gap-12">
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
