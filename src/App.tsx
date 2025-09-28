import { useState } from 'react';
import { Home } from './pages/Home';
import { useWeather } from './hooks/useWeather';
import type { UnitsState } from './types/unitsState';
import './App.css';

function App() {
  const [ units, setUnits ] = useState<UnitsState>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm"
  });

  const { data } = useWeather(units);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Home data={data} units={units} setUnits={setUnits} />
    </>
  )
}

export default App
