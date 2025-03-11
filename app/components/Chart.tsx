'use client';

import React from 'react';
import { Sparklines, SparklinesBars, SparklinesReferenceLine } from 'react-sparklines';

function Chart({ forecastData }) {
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
