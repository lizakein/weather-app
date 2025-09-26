import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { DailyForecast } from "../components/DailyForecast/DailyForecast";
import { Header } from "../components/Header/Header";
import { HourlyForecast } from "../components/HourlyForecast/HourlyForecast";
import { Search } from "../components/Search/Search";
import type { WeatherData } from "../types/weather";

interface HomeProps {
  data: WeatherData;
};

export function Home({ data }: HomeProps) {
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="main-content">
        <Search />

        <div className="weather-card">
          <div className="weather-column">
            <CurrentWeather data={data} />
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