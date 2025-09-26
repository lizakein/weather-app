import type { WeatherData } from "../types/weather";

export function transformDaily(data: WeatherData["daily"]) {
  return data.time.map((date, i) => ({
    date,
    weather_code: data.weather_code[i],
    temperature_2m_max: data.temperature_2m_max[i],
    temperature_2m_min: data.temperature_2m_min[i]
  }));
}