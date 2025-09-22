import { mockWeather } from "../../mockData";
import SunnyIcon from "../../assets/images/icon-sunny.webp";

export function HourlyForecast() {
  const data = mockWeather.hourly;
  
  return (
    <section className="hourly-forecast" aria-label="Hourly forecast">
      <h2 className="hourly-forecast__title">Hourly forecast</h2>
      <ul className="hourly-forecast__list">
        { data.map((hour, index) => 
          <li key={index} className="hourly-forecast__item">
            <div className="hourly-forecast__time-block">
              <img src={SunnyIcon} alt="Sunny" className="hourly-forecast__icon" />
              <time className="hourly-forecast__date" dateTime={hour.time}>{hour.time}</time>
            </div>
                        
            <span 
              className="hourly-forecast__temperature"
              aria-label={`Temperature ${hour.temperature_2m} degrees at ${hour.time}`}
            >
              {hour.temperature_2m}°
            </span>
          </li>
        )}
      </ul>      
    </section>
  );
}