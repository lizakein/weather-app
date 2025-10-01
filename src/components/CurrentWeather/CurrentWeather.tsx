import type { HomeCity } from "../../types/homeCity";
import type { UnitsState } from "../../types/unitsState";
import type { WeatherData } from "../../types/weather";
import { formatFullDate, formatNumber } from "../../utils/format";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  data: WeatherData;
  units: UnitsState;
  selectedCity: HomeCity;
};

export function CurrentWeather({ data, units, selectedCity }: CurrentWeatherProps) {
  const { current } = data;
  const { src, alt } = getWeatherIcon(current.weather_code);

  const details = [
    { label: "Feels Like", 
      value: `${formatNumber(current.apparent_temperature)}°` 
    },
    { label: "Humidity", 
      value: `${formatNumber(current.relative_humidity_2m)}%` 
    },
    { label: "Wind", 
      value: `${formatNumber(current.wind_speed_10m)} ${units.wind === "kmh" ? "km/h" : "mph"}` 
    },
    { label: "Precipitation", 
      value: `${formatNumber(current.precipitation)} ${units.precipitation === "mm" ? "mm" : "in"}` 
    }
  ];

  return (
    <section className="weather" aria-label="Current weather">
      <header className="weather__header">
        <div className="weather__location-info">
          <h2 className="weather__place">
            {`${selectedCity.city}, ${selectedCity.country}`}
          </h2>
          <p className="weather__date">{formatFullDate(current.time)}</p>
        </div>  
        <div className="weather__temperature-container">
          <img src={src} alt={alt} className="weather__icon"/>
          <h3 className="weather__temperature">{formatNumber(current.temperature_2m)}°</h3>
        </div> 
      </header>
      <dl className="weather__details">
        { details.map(({label, value}) => (
          <div key={label} className="weather__detail">
            <dt className="weather__label">{label}</dt>
            <dd className="weather__value">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}