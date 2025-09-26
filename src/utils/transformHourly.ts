import type { WeatherData } from "../types/weather";

export function transformHourly(data: WeatherData["hourly"]) {
  return data.time.map((time, i) => ({
    time,
    temperature_2m: data.temperature_2m[i],
    weather_code: data.weather_code[i]
  }));
}