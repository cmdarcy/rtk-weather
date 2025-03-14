'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  month: 'short',
  hour: 'numeric',
  hour12: true,
};

const formatter = new Intl.DateTimeFormat('en-US', options);

const chartConfig = {
  temp: {
    label: 'Temperature(℉)',
    color: '#2563eb',
  },
  pressure: {
    label: 'Pressure(hPa) ',
  },
  humidity: {
    label: 'Humidity(%)',
  },
} satisfies ChartConfig;

type ShadChartProps = {
  forecastData: ForecastDataPoint[];
  dataType: 'temp' | 'pressure' | 'humidity';
};

function ShadChart({ forecastData, dataType }: ShadChartProps) {
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

  let averageLineValue: number;
  let displayAverage: string;
  if (dataType === 'temp') {
    averageLineValue = tempAverage;
    displayAverage = `${tempAverage} ℉`;
  } else if (dataType === 'humidity') {
    averageLineValue = humidityAverage;
    displayAverage = `${humidityAverage} % `;
  } else {
    averageLineValue = pressureAverage;
    displayAverage = `${pressureAverage} hPA`;
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
        <CardTitle>{dataType.toUpperCase()}</CardTitle>
        <CardDescription>5 Day Forecast</CardDescription>
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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item, index, payload) =>
                    `${value} at ${payload.displayDate}`
                  }
                />
              }
            />
            <ReferenceLine
              y={averageLineValue}
              label="Avg"
              stroke="red"
              strokeDasharray="3 3"
            />
            <Line
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
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          {dataType.toUpperCase()} Average: {displayAverage}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ShadChart;
