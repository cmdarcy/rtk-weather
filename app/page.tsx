'use client';

import Forecast from './components/Forecast';
import { ModeToggle } from './components/ModeToggle';
import ShadSearchForm from './components/ShadSearchForm';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        RTK Weather
      </h1>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <ShadSearchForm />
      <Forecast />
    </main>
  );
}
