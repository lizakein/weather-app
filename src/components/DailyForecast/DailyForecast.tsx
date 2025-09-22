import { mockWeather } from "../../mockData";
import SunnyIcon from "../../assets/images/icon-sunny.webp";

export function DailyForecast() {
  const data = mockWeather.daily;
  
  return (
    <section className="daily-forecast" aria-label="Daily forecast">
      <h2 className="daily-forecast__title">Daily forecast</h2>
      <ul className="daily-forecast__list">
        { data.map((day, index) => 
          <li key={index} className="daily-forecast__item">
            <time className="daily-forecast__date" dateTime={day.date}>{day.date}</time>
            <img src={SunnyIcon} alt="Sunny" className="daily-forecast__icon" />
            <div className="daily-forecast__temperatures">
              <span 
                className="daily-forecast__temp-max"
                aria-label={`Maximum temperature ${day.temperature_2m_max} degrees`}
              >
                {day.temperature_2m_max}°
              </span>
              <span 
                className="daily-forecast__temp-min"
                aria-label={`Minimum temperature ${day.temperature_2m_max} degrees`}
              >
                {day.temperature_2m_min}°
              </span>
            </div>
          </li>
        )}
      </ul>      
    </section>
  );
}