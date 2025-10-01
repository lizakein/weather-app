import type { WeatherData } from "../types/weather";
import { getWeatherIcon } from "./getWeatherIcon"; 
import { formatNumber } from "./format";

export function transformHourly(data: WeatherData["hourly"]) {
  return data.time.map((time, i) => ({
    time,
    temperature_2m: formatNumber(data.temperature_2m[i]),
    weather_code: getWeatherIcon(data.weather_code[i])
  }));
}