import { transformDaily } from "../../utils/transformDaily";
import type { WeatherData } from "../../types/weather";
import "./DailyForecast.css";
import type { WeatherIcon } from "../../utils/getWeatherIcon";
import { formatDayOfWeek } from "../../utils/format";

interface DailyForecastProps {
  data: WeatherData;
};

type DailyDay = {
  date: Date;
  weather_code: WeatherIcon;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export function DailyForecast({ data }: DailyForecastProps) {
  const dailyData: DailyDay[] = transformDaily(data.daily);
  
  return (
    <section className="daily-forecast" aria-label="Daily forecast">
      <h2 className="daily-forecast__title">Daily forecast</h2>
      <ul className="daily-forecast__list">
        { dailyData.map((day) => {
          return ( 
            <li key={day.date.toISOString()} className="daily-forecast__item">
              <time 
                className="daily-forecast__date" 
                dateTime={day.date.toISOString()}
              >
                {formatDayOfWeek(day.date)}
              </time>
              <img src={day.weather_code.src} alt={day.weather_code.alt} className="daily-forecast__icon" />
              <div className="daily-forecast__temperatures">
                <span 
                  className="daily-forecast__temp-max"
                  aria-label={`Maximum temperature ${day.temperature_2m_max} degrees`}
                >
                  {day.temperature_2m_max}°
                </span>
                <span 
                  className="daily-forecast__temp-min"
                  aria-label={`Minimum temperature ${day.temperature_2m_min} degrees`}
                >
                  {day.temperature_2m_min}°
                </span>
              </div>
            </li>
          )}
        )}
      </ul>      
    </section>
  );
}