'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ForecastDataPoint } from '../Store/slices/forecastSlice';

const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const formatter = new Intl.DateTimeFormat('en-US', options);

const chartConfig = {
  temp: {
    label: 'Temperature(in F)',
    color: '#2563eb',
  },
  pressure: {
    label: 'Pressure(in hPa) ',
    color: '#2563eb',
  },
  humidity: {
    label: 'Humidity(%)',
    color: '#2563eb',
  },
} satisfies ChartConfig;

type ShadChartProps = {
  forecastData: ForecastDataPoint[];
  dataType: 'temp' | 'pressure' | 'humidity';
  city: string;
};

function ShadChart({ forecastData, dataType, city }: ShadChartProps) {
  const tempForecasts = forecastData.map(
    (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.temp,
  );
  const pressureForecasts = forecastData.map(
    (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.pressure,
  );
  const humidityForecasts = forecastData.map(
    (foreCastEntry: ForecastDataPoint) => foreCastEntry.main.humidity,
  );

  const tempAverage = Math.round(
    tempForecasts.reduce((prev, curr) => prev + curr) / tempForecasts.length,
  );
  const pressureAverage = Math.round(
    pressureForecasts.reduce((prev, curr) => prev + curr) /
      pressureForecasts.length,
  );
  const humidityAverage = Math.round(
    humidityForecasts.reduce((prev, curr) => prev + curr) /
      humidityForecasts.length,
  );

  let displayAverage: number;
  if (dataType === 'temp') {
    displayAverage = tempAverage;
  } else if (dataType === 'humidity') {
    displayAverage = humidityAverage;
  } else {
    displayAverage = pressureAverage;
  }

  const chartData = forecastData.map((f) => {
    const date = new Date(f.dt_txt);
    const displayDate = formatter.format(date);
    return {
      temp: f.main.temp,
      pressure: f.main.pressure,
      humidity: f.main.humidity,
      displayDate,
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {city} - {dataType.toUpperCase()}
        </CardTitle>
        <CardDescription>
          5 Day Forecast Average: {displayAverage}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ReferenceLine
              y={displayAverage}
              label="Avg"
              stroke="red"
              strokeDasharray="3 3"
            />
            <Line
              // TODO Update datakey and color variables???
              dataKey={dataType}
              type="natural"
              stroke="var(--color-temp)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-temp)',
              }}
              activeDot={{
                r: 6,
              }}
              // TODO add average in footer?
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ShadChart;
