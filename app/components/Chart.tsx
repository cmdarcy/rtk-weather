'use client';

import React from 'react';
import {
  Sparklines,
  SparklinesBars,
  SparklinesReferenceLine,
} from 'react-sparklines';

type ChartProps = {
  forecastData: number[];
  title: string;
  units: string;
};
function Chart({ forecastData, title, units }: ChartProps) {
  const dataSum = forecastData.reduce((curr, value) => curr + value, 0);

  const average = Math.round(dataSum / forecastData.length);

  return (
    <div>
      <h3>{title}</h3>
      <p>
        Average: {average} {units}
      </p>
      <Sparklines data={forecastData}>
        <SparklinesBars />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
    </div>
  );
}

export default Chart;
