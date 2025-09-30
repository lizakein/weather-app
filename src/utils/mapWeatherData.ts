import { getVar } from '../utils/getVar';
import type { RawResponse } from '../api/types';
import type { WeatherData } from '../types/weather';

function toNumberArray(arr?: Float32Array | null): number[] {
  return arr ? Array.from(arr) : [];
}

function buildTimeSeries(
  start: number,
  end: number,
  interval: number,
  offset: number
): Date[] {
  const count = Math.max(0, Math.floor((end - start) / interval));
  return Array.from({ length: count }, (_, i) => 
    new Date((start + i * interval + offset) * 1000)
  );
}

export function mapWeatherData(response: RawResponse): WeatherData {
  if (!response) throw new Error("Empty weather response");

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  if (!current) throw new Error("Missing current data in response");
  if (!hourly) throw new Error("Missing hourly data in response");
  if (!daily) throw new Error("Missing daily data in response");

  const currentTime = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
  const currentData = {
    time: currentTime,
    weather_code: getVar(current, 0),
    temperature_2m: getVar(current, 1),
    relative_humidity_2m: getVar(current, 2),
    precipitation: getVar(current, 3),
    wind_speed_10m: getVar(current, 4),
    apparent_temperature: getVar(current, 5),
  };

  const hourlyTimes = buildTimeSeries(
    Number(hourly.time()),
    Number(hourly.timeEnd()),
    hourly.interval(),
    utcOffsetSeconds
  );
  const hourlyData = {
    time: hourlyTimes,
    temperature_2m: toNumberArray(hourly.variables(0)?.valuesArray?.()),
    weather_code: toNumberArray(hourly.variables(1)?.valuesArray?.()),
  };

  const dailyTimes = buildTimeSeries(
    Number(daily.time()),
    Number(daily.timeEnd()),
    daily.interval(),
    utcOffsetSeconds
  );
  const dailyData = {
    time: dailyTimes,
    weather_code: toNumberArray(daily.variables(0)?.valuesArray?.()),
    temperature_2m_max: toNumberArray(daily.variables(1)?.valuesArray?.()),
    temperature_2m_min: toNumberArray(daily.variables(2)?.valuesArray?.()),
  }

  return { current: currentData, hourly: hourlyData, daily: dailyData }
}