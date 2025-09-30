import { fetchWeatherApi } from 'openmeteo';
import type { UnitsState } from '../types/unitsState';
import type { RawResponse } from './types';

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherRaw(units: UnitsState, lat: number, lon: number) {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "weather_code", 
      "temperature_2m", 
      "relative_humidity_2m", 
      "precipitation", 
      "wind_speed_10m", 
      "apparent_temperature"
    ],
    timezone: "Europe/Moscow",
    temperature_unit: units.temperature,
    wind_speed_unit: units.wind,
    precipitation_unit: units.precipitation
  };

  const responses = await fetchWeatherApi(BASE_URL, params);
  if (!responses?.length) throw new Error("No response from OpenMeteo API");
  return responses[0] as unknown as RawResponse;
}