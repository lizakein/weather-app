import { mockWeather } from "../../mockData";
import SunnyIcon from "../../assets/images/icon-sunny.webp";

export function CurrentWeather() {
  const data = mockWeather.current;

  return (
    <section className="weather" aria-label="Current weather">
      <header className="weather__header">
        <h2 className="weather__place">Berlin, German</h2>
        <h3 className="weather__date">{data.date}</h3>
        <img src={SunnyIcon} alt="Sunny weather" className="weather-icon"/>
        <h3 className="weather__temperature">{data.temperature_2m}°</h3>
      </header>
      <dl className="weather__details">
        <div className="weather__detail">
          <dt className="weather__label">Feels Like</dt>
          <dd className="weather__value">{data.apparent_temperature}°</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Humidity</dt>
          <dd className="weather__value">{data.relative_humidity_2m}%</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Wind</dt>
          <dd className="weather__value">{data.wind_speed_10m} km/h</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Precipitation</dt>
          <dd className="weather__value">{data.precipitation} mm</dd>
        </div>
      </dl>
    </section>
  );
}