import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { Header } from "../components/Header/Header";
import { Search } from "../components/Search/Search";

export function Home() {
  return (
    <>
      <Header />
      <Search />
      <CurrentWeather />
    </>
  );
}