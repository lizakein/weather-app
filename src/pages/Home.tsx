import type { Dispatch, SetStateAction } from "react";
import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { DailyForecast } from "../components/DailyForecast/DailyForecast";
import { Header } from "../components/Header/Header";
import { HourlyForecast } from "../components/HourlyForecast/HourlyForecast";
import { Search } from "../components/Search/Search";
import type { UnitsState } from "../types/unitsState";
import type { WeatherData } from "../types/weather";

interface HomeProps {
  data: WeatherData;
  units: UnitsState;
  setUnits: Dispatch<SetStateAction<UnitsState>>;
  selectedCity: { 
    lat: number, 
    lon: number, 
    city: string, 
    country: string 
  };
  onSelectCity: (coords: { 
    lat: number, 
    lon: number, 
    city: string, 
    country: string 
  }) => void;
};

export function Home({ data, units, setUnits, selectedCity, onSelectCity }: HomeProps) {
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Header units={units} setUnits={setUnits} />
      <div className="main-content">
        <Search onSelectCity={onSelectCity} />

        <div className="weather-card">
          <div className="weather-column">
            <CurrentWeather 
              data={data} 
              units={units} 
              selectedCity={selectedCity} 
            />
            <DailyForecast data={data} />
          </div>
          
          <div className="weather-column weather-column--scroll">
            <div className="hourly-viewport">
              <HourlyForecast data={data} />
            </div>        
          </div>
        </div>
      </div>   
    </>
  );
}