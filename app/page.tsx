'use client';

import Forecast from './components/Forecast';
import SearchForm from './components/SearchForm';

export default function Home() {
  return (
    <main>
      <h1>RTK Weather</h1>
      <SearchForm />
      <Forecast />
    </main>
  );
}
