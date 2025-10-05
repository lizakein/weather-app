import { useEffect, useState } from 'react'
import { getWeather } from '../api/weatherService';
import type { WeatherData } from '../types/weather';
import type { UnitsState } from '../types/unitsState';

export function useWeather(
  units: UnitsState, 
  lat?: number, 
  lon?: number,
  retryTrigger: number = 0
) {
  const [ data, setData ] = useState<WeatherData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    setLoading(true);
    setError(null);
    
    getWeather(units, lat, lon)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [units, lat, lon, retryTrigger]);

  return { data, loading, error };
}
