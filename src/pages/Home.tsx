import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { DailyForecast } from "../components/DailyForecast/DailyForecast";
import { Header } from "../components/Header/Header";
import { HourlyForecast } from "../components/HourlyForecast/HourlyForecast";
import { Search } from "../components/Search/Search";

export function Home() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Search />

        <div className="weather-card">
          <div className="weather-column">
            <CurrentWeather />
            <DailyForecast />
          </div>
          
          <div className="weather-column weather-column--scroll">
            <div className="hourly-viewport">
              <HourlyForecast />
            </div>        
          </div>
        </div>
      </div>   
    </>
  );
}