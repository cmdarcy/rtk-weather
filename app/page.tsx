'use client';

import Chart from './components/Chart';
import SearchForm from './components/SearchForm';
import { useAppSelector } from './Store/hook';
import {
  ForecastDataPoint,
  selectForecast,
} from './Store/slices/forecastSlice';

export default function Home() {
  const forecast = useAppSelector(selectForecast);
  if (forecast.status === 'succeeded') {
    const tempForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.temp,
    );
    const pressureForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.pressure,
    );
    const humidityForecasts = forecast.forecast.list.map(
      (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.humidity,
    );

    return (
      <main>
        <h1>RTK Weather</h1>
        <SearchForm />
        <Chart title="Temperature" forecastData={tempForecasts} units="°F" />
        <Chart title="Pressure" forecastData={pressureForecasts} units="hPa" />
        <Chart title="Humidity" forecastData={humidityForecasts} units="%" />
      </main>
    );
  }
  // TODO add today's forecast component
  // TODO Add error fetching message
  return (
    <main>
      <h1>RTK Weather</h1>
      <SearchForm />
    </main>
  );
}
