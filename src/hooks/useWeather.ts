import { useEffect, useState } from 'react'
import { getWeather } from '../api/meteoApi';
import type { WeatherData } from '../types/weather';

export function useWeather() {
  const [ data, setData ] = useState<WeatherData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    getWeather()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
