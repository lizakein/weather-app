export interface WeatherData {
  current: {
    time: Date;
    weather_code: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    apparent_temperature: number;
  },
  hourly: {
    time: Date[];
    temperature_2m: number[];
    weather_code: number[];
  },
  daily: {
    time: Date[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  }
}