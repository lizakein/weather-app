import { CurrentWeather } from "../components/CurrentWeather/CurrentWeather";
import { Header } from "../components/Header/Header";

export function Home() {
  return (
    <>
      <Header />
      <CurrentWeather />
    </>
  );
}