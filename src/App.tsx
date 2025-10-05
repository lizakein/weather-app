import { Home } from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import type { UnitsState } from './types/unitsState';
import type { HomeCity } from './types/homeCity'; 
import "react-loading-skeleton/dist/skeleton.css";
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useState } from 'react';

const DEFAULT_UNITS: UnitsState = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm"
};

const DEFAULT_COORDS: HomeCity = { 
  lat: 52.52, 
  lon: 13.405, 
  city: "Berlin", 
  country: "Germany" 
};

function App() {
  const [ units, setUnits ] = useLocalStorage<UnitsState>("units", DEFAULT_UNITS);
  const { coords, setCoords, isLoading: geoLoading } = useGeolocation({ defaultCoords: DEFAULT_COORDS});

  const [ retryTrigger, setRetryTrigger ] = useState(0);

  const { data, loading: weatherLoading, error } = useWeather(
    units, 
    coords ? coords.lat : undefined,
    coords ? coords.lon : undefined,
    retryTrigger
  );

  const isAppLoading = geoLoading || weatherLoading;

  if (error) {
    return (
      <ErrorPage 
        units={units} 
        setUnits={setUnits} 
        onRetry={() => setRetryTrigger(prev => prev + 1)}
      />
    );
  }

  if (!coords || !data) {
    return (
      <Home
        data={null}
        units={units}
        setUnits={setUnits}
        selectedCity={coords ?? DEFAULT_COORDS}
        onSelectCity={setCoords}
        loading={true}
      />
    );
  }

  return (
    <Home 
      data={data} 
      units={units} 
      setUnits={setUnits}
      selectedCity={coords!}
      onSelectCity={setCoords}
      loading={isAppLoading}
    />
  )
}

export default App
