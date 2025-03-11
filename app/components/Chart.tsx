'use client';

import React from 'react';
import {
  Sparklines,
  SparklinesBars,
  SparklinesReferenceLine,
} from 'react-sparklines';

type ChartProps = {
  forecastData: number[];
};
function Chart({ forecastData }: ChartProps) {
  return (
    <div>
      <Sparklines data={forecastData}>
        <SparklinesBars />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
    </div>
  );
}

export default Chart;
