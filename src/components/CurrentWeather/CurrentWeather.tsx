import type { UnitsState } from "../../types/unitsState";
import type { WeatherData } from "../../types/weather";
import { formatFullDate, formatNumber } from "../../utils/format";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  data: WeatherData;
  units: UnitsState;
  selectedCity: { 
    lat: number, 
    lon: number, 
    city: string, 
    country: string 
  };
};

export function CurrentWeather({ data, units, selectedCity }: CurrentWeatherProps) {
  const currentData = data.current;

  const { src, alt } = getWeatherIcon(currentData.weather_code);

  return (
    <section className="weather" aria-label="Current weather">
      <header className="weather__header">
        <div className="weather__location-info">
          <h2 className="weather__place">
            {`${selectedCity.city}, ${selectedCity.country}`}
          </h2>
          <h3 className="weather__date">{formatFullDate(currentData.time)}</h3>
        </div>  
        <div className="weather__temperature-container">
          <img src={src} alt={alt} className="weather__icon"/>
          <h3 className="weather__temperature">{formatNumber(currentData.temperature_2m)}°</h3>
        </div> 
      </header>
      <dl className="weather__details">
        <div className="weather__detail">
          <dt className="weather__label">Feels Like</dt>
          <dd className="weather__value">{formatNumber(currentData.apparent_temperature)}°</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Humidity</dt>
          <dd className="weather__value">{currentData.relative_humidity_2m}%</dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Wind</dt>
          <dd className="weather__value">
            {formatNumber(currentData.wind_speed_10m)} 
            &nbsp;
            {units.wind === "kmh" ? "km/h" : "mph"}
          </dd>
        </div>
        <div className="weather__detail">
          <dt className="weather__label">Precipitation</dt>
          <dd className="weather__value">
            {formatNumber(currentData.precipitation)} 
            &nbsp;
            {units.precipitation === "mm" ? "mm" : "in"}
          </dd>
        </div>
      </dl>
    </section>
  );
}