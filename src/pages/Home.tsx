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
        <CurrentWeather />
        <DailyForecast />
        <HourlyForecast />
      </div>   
    </>
  );
}