import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { DailyForecast } from "../components/DailyForecast/DailyForecast";
import { HourlyForecast } from "../components/HourlyForecast/HourlyForecast";
import type { UnitsState } from "../types/unitsState";
import type { WeatherData } from "../types/weather";
import type { HomeCity } from "../types/homeCity";

interface WeatherDashboardProps {
  data: WeatherData;
  units: UnitsState;
  selectedCity: HomeCity;
};

export function WeatherDashboard({ data, units, selectedCity }: WeatherDashboardProps) {
  return (
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
  );
}