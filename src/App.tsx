import { Home } from './pages/Home'
import './App.css';
import { useWeather } from './hooks/useWeather';

function App() {
  const { data } = useWeather();

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Home data={data} />
    </>
  )
}

export default App
