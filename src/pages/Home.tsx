import type { Dispatch, SetStateAction } from "react";
import { Header } from "../components/Header/Header";
import { Search } from "../components/Search/Search";
import { LoadingScreen } from '../components/Sceleton/LoadingScreen';
import type { UnitsState } from "../types/unitsState";
import type { WeatherData } from "../types/weather";
import type { HomeCity } from "../types/homeCity";
import { WeatherDashboard } from "../components/WeatherDashboard";
import "./Home.css";

interface HomeProps {
  data: WeatherData | null;
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
  selectedCity: HomeCity;
  onSelectCity: (city: HomeCity) => void;
  loading: boolean;
};

export function Home({ 
  data, 
  units, 
  setUnits, 
  selectedCity, 
  onSelectCity, 
  loading 
}: HomeProps) {
  return (
    <>
      <Header units={units} setUnits={setUnits} />
      <h1 className="home__title">How's the sky looking today?</h1>

      <main className="home__content">        
        <Search onSelectCity={onSelectCity} />

        { loading ? (
          <LoadingScreen /> 
        ) : data && (
          <WeatherDashboard 
            data={data} 
            units={units} 
            selectedCity={selectedCity} 
          />
        )}
      </main>
    </>
  );
}