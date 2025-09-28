import { useEffect, useState } from 'react'
import { getWeather } from '../api/meteoApi';
import type { WeatherData } from '../types/weather';
import type { UnitsState } from '../types/unitsState';

export function useWeather(units: UnitsState) {
  const [ data, setData ] = useState<WeatherData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    getWeather(units)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [units]);

  return { data, loading, error };
}
