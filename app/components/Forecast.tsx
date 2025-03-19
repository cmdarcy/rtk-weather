'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { selectForecast } from '../Store/slices/forecastSlice';
import { useAppSelector } from '../Store/hook';
import ShadChart from './ShadChart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Displays the weather forecast based on the selected city.
 * Utilizes the Redux store to retrieve forecast data.
 * @returns {JSX.Element} The rendered forecast component.
 */
function Forecast() {
  const { forecast, status, error } = useAppSelector(selectForecast);
  let city: string;

  if (status === 'succeeded') {
    city = forecast.city.name;
  }

  return (
    <div className="mt-7">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>
            Sorry there was an error, please try searching again!
          </AlertDescription>
        </Alert>
      )}
      {status === 'succeeded' && (
        <div className="w-screen px-24">
          <h2 className=" text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {city}
          </h2>
          <div className="flex flex-col gap-12">
            <ShadChart dataType="temp" forecastData={forecast.list} />
            <ShadChart dataType="pressure" forecastData={forecast.list} />
            <ShadChart dataType="humidity" forecastData={forecast.list} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast;
