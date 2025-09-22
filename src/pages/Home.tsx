import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { DailyForecast } from "../components/DailyForecast/DailyForecast";
import { Header } from "../components/Header/Header";
import { Search } from "../components/Search/Search";

export function Home() {
  return (
    <>
      <Header />
      <Search />
      <CurrentWeather />
      <DailyForecast />
    </>
  );
}