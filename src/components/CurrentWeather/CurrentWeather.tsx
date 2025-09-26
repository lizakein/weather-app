import SunnyIcon from "../../assets/images/icon-sunny.webp";
import type { WeatherData } from "../../types/weather";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  data: WeatherData;
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const currentData = data.current;

  return (
    <section className="weather" aria-label="Current weather">
      <header className="weather__header">
        <div className="weather__location-info">
          <h2 className="weather__place">Berlin, Germany</h2>
          <h3 className="weather__date">{"Date"}</h3>
        </div>  
        <div className="weather__temperature-container">
          <img src={SunnyIcon} alt="Sunny weather" className="weather__icon"/>
          <h3 className="weather__temperature">{currentData.temperature_2m}°</h3>
        </div> 
      </header>
      <dl className="weather__details">
        <div className="weather__detail">
          <dt className="weather__label">Feels Like</dt>
          <dd className="weather__value">{currentData.apparent_temperature}°</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Humidity</dt>
          <dd className="weather__value">{currentData.relative_humidity_2m}%</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Wind</dt>
          <dd className="weather__value">{currentData.wind_speed_10m} km/h</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Precipitation</dt>
          <dd className="weather__value">{currentData.precipitation} mm</dd>
        </div>
      </dl>
    </section>
  );
}