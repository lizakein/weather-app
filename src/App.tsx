import { useState } from 'react';
import { Home } from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import type { UnitsState } from './types/unitsState';
import type { HomeCity } from './types/homeCity'; 
import "react-loading-skeleton/dist/skeleton.css";
import './App.css';

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
  const [ units, setUnits ] = useState<UnitsState>(DEFAULT_UNITS);
  const { coords, setCoords, isLoading: geoLoading } = useGeolocation({ defaultCoords: DEFAULT_COORDS});

  const { data, loading: weatherLoading, error } = useWeather(
    units, 
    coords ? coords.lat : undefined,
    coords ? coords.lon : undefined
  );

  const isAppLoading = geoLoading || weatherLoading;

  if (error) {
    return <ErrorPage units={units} setUnits={setUnits} />;
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
