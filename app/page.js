'use client';

import Chart from './components/Chart';
import SearchForm from './components/SearchForm';
import { useAppSelector } from './Store/hook';
import { selectForecast } from './Store/slices/forecastSlice';

export default function Home() {
  const forecast = useAppSelector(selectForecast);
  if (Object.keys(forecast).length !== 0) {
    const tempForecasts = forecast.list.map(
      (foreCastEntry) => foreCastEntry.main.temp,
    );
    const pressureForecasts = forecast.list.map((foreCastEntry) => foreCastEntry.main.pressure)
    const humidityForecasts = forecast.list.map((foreCastEntry) => foreCastEntry.main.humidity)
    return (
      <main>
        <h1>RTK Weather</h1>
        <SearchForm />
        <Chart forecastData={tempForecasts} />
        <Chart forecastData={pressureForecasts} />
        <Chart forecastData={humidityForecasts} />
      </main>
    );
  }
  return (
    <main>
      <h1>RTK Weather</h1>
      <SearchForm />
    </main>
  );
}
