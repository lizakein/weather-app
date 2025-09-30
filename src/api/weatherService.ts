import { mapWeatherData } from '../utils/mapWeatherData';
import type { WeatherData } from '../types/weather';
import type { UnitsState } from '../types/unitsState';
import { fetchWeatherRaw } from './meteoApi';

export async function getWeather(
  units: UnitsState,
  lat: number,
  lon: number
): Promise<WeatherData> {
  const raw = await fetchWeatherRaw(units, lat, lon);
  return mapWeatherData(raw);
}