import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';
import { useWeather } from './hooks/useWeather';
import type { UnitsState } from './types/unitsState';
import "react-loading-skeleton/dist/skeleton.css";
import './App.css';

const DEFAULT_COORDS = { 
  lat: 52.52, 
  lon: 13.405, 
  city: "Berlin", 
  country: "Germany" 
};

function App() {
  const [ units, setUnits ] = useState<UnitsState>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm"
  });

  const [ coords, setCoords ] = useState(DEFAULT_COORDS);

  const { data, loading, error } = useWeather(
    units, 
    coords?.lat ?? DEFAULT_COORDS.lat, 
    coords?.lon ?? DEFAULT_COORDS.lon
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;   
        setCoords({
          lat: latitude,
          lon: longitude,
          city: "Your location",
          country: ""
        });
      },
      (error) => console.log("Geolocation disabled", error)
    );
  }, []);

  return (
    <>
      { error &&
        <ErrorPage units={units} setUnits={setUnits} />
      }
      { (data && coords || loading) &&
        <Home 
          data={data} 
          units={units} 
          setUnits={setUnits}
          selectedCity={coords}
          onSelectCity={setCoords}
          loading={loading}
        /> 
      }
    </>
  )
}

export default App
