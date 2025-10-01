import type { WeatherData } from "../types/weather";
import { formatNumber } from "./format";
import { getWeatherIcon } from "./getWeatherIcon";

export function transformDaily(data: WeatherData["daily"]) {
  return data.time.map((date, i) => ({
    date,
    weather_code: getWeatherIcon(data.weather_code[i]),
    temperature_2m_max: formatNumber(data.temperature_2m_max[i]),
    temperature_2m_min: formatNumber(data.temperature_2m_min[i])
  }));
}