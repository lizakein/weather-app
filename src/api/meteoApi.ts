import { fetchWeatherApi } from 'openmeteo';
import type { WeatherData } from '../types/weather';
import type { UnitsState } from '../types/unitsState';

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

function toNumberArray(arr: Float32Array | null | undefined): number[] {
  return arr ? Array.from(arr) : [];
}

export async function getWeather(units: UnitsState): Promise<WeatherData> {
  const params = {
    latitude: 51.672,
    longitude: 39.1843,
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
  const response = responses[0];
  if (!response) throw new Error("No response from API");

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  if (!current || !hourly || !daily) throw new Error("Incomplete response structure");

  const getCurrentVar = (idx: number): number => {
    const v = current.variables(idx);
    return v ? Number(v.value()) : NaN;
  };

  const currentTime = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);


  const hourlyCount = Math.max(
    0,
    Math.floor((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())
  );
  const hourlyTimes = Array.from({ length: hourlyCount }, (_, i) =>
    new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
  );

  const hourlyTemp = toNumberArray(hourly.variables(0)?.valuesArray());
  const hourlyCode = toNumberArray(hourly.variables(1)?.valuesArray());

  
  const dailyCount = Math.max(
    0,
    Math.floor((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())
  );
  const dailyTimes = Array.from({ length: dailyCount }, (_, i) =>
    new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
  );

  const dailyCode = toNumberArray(daily.variables(0)?.valuesArray());
  const dailyMax = toNumberArray(daily.variables(1)?.valuesArray());
  const dailyMin = toNumberArray(daily.variables(2)?.valuesArray());

  const weatherData: WeatherData = {
    current: {
      time: currentTime,
      weather_code: getCurrentVar(0),
      temperature_2m: getCurrentVar(1),
      relative_humidity_2m: getCurrentVar(2),
      precipitation: getCurrentVar(3),
      wind_speed_10m: getCurrentVar(4),
      apparent_temperature: getCurrentVar(5),
    },
    hourly: {
      time: hourlyTimes,
      temperature_2m: hourlyTemp,
      weather_code: hourlyCode,
    },
    daily: {
      time:dailyTimes,
      weather_code: dailyCode,
      temperature_2m_max: dailyMax,
      temperature_2m_min: dailyMin,
    },
  };

  return weatherData;
}