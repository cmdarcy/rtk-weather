export type ForecastDataPoint = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: { all: number };
  wind: Wind;
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
};

export type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastDataPoint[];
  city: City;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Weather = { id: number; main: string; description: string; icon: string };

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lat: number;
  lon: number;
};
