import { transformDaily } from "../../utils/transformDaily";
import { formatDayOfWeek, formatNumber } from "../../utils/format";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import type { WeatherData } from "../../types/weather";
import "./DailyForecast.css";

interface DailyForecastProps {
  data: WeatherData;
};

export function DailyForecast({ data }: DailyForecastProps) {
  const dailyData = transformDaily(data.daily);
  
  return (
    <section className="daily-forecast" aria-label="Daily forecast">
      <h2 className="daily-forecast__title">Daily forecast</h2>
      <ul className="daily-forecast__list">
        { dailyData.map((day, index) => {
          const maxTemp = formatNumber(day.temperature_2m_max);
          const minTemp = formatNumber(day.temperature_2m_min);

          const { src, alt } = getWeatherIcon(day.weather_code);

          return ( 
            <li key={index} className="daily-forecast__item">
              <time 
                className="daily-forecast__date" 
                dateTime={day.date.toISOString()}
              >
                {formatDayOfWeek(day.date)}
              </time>
              <img src={src} alt={alt} className="daily-forecast__icon" />
              <div className="daily-forecast__temperatures">
                <span 
                  className="daily-forecast__temp-max"
                  aria-label={`Maximum temperature ${maxTemp} degrees`}
                >
                  {maxTemp}°
                </span>
                <span 
                  className="daily-forecast__temp-min"
                  aria-label={`Minimum temperature ${minTemp} degrees`}
                >
                  {minTemp}°
                </span>
              </div>
            </li>
          )}
        )}
      </ul>      
    </section>
  );
}