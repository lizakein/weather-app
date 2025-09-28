import { useState } from "react";
import type { WeatherData } from "../../types/weather";
import { useContextMenu } from "../../hooks/useContextMenu";
import { transformHourly } from "../../utils/transformHourly";
import { formatAriaDateTime, formatHour, formatNumber } from "../../utils/format";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";
import { DaysMenu } from "./DaysMenu";
import "./HourlyForecast.css";

interface HourlyForecastProps {
  data: WeatherData;
};

export function HourlyForecast({ data }: HourlyForecastProps) {
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const hourlyData = transformHourly(data.hourly);

  const filterByDay = (hourlyData: {time: Date; temperature_2m: number; weather_code: number}[], selectedDay: Date) => {
    return hourlyData.filter(hour => 
      hour.time.getDate() === selectedDay.getDate() &&
      hour.time.getMonth() === selectedDay.getMonth()
    );
  };
  const filteredData = filterByDay(hourlyData, selectedDay);
  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return (
    <section className="hourly-forecast" aria-label="Hourly forecast">
      <div className="hourly-forecast__header">
        <h2 className="hourly-forecast__title">Hourly forecast</h2>

        <div className="houtly-forecast__dropdown">
          <button 
            className="hourly-forecast__button" 
            aria-haspopup="true"
            aria-expanded={ openId === "day" }
            aria-controls="days-menu"
            onClick={e => handleMoreClick(e, "day")}
          >
            <span className="hourly-forecast__button-text">{daysOfWeek[selectedDay.getDay()]}</span>
            <img src={DropDownIcon} alt="" className="hourly-forecast__dropdown-icon"/> 
          </button>

					{ openId === "day" && menuPosition &&
						<DaysMenu 
              menuPosition={menuPosition} 
              closeMenu={closeMenu} 
              days={data.daily.time.map(d => new Date(d))}
              onSelectDay={setSelectedDay}
            />
					}
        </div>   
      </div>
      
      <ul className="hourly-forecast__list">
        { filteredData.map((hour, index) => {
          const temp = formatNumber(hour.temperature_2m);

          const { src, alt } = getWeatherIcon(hour.weather_code);

          return (
            <li key={index} className="hourly-forecast__item">
              <div className="hourly-forecast__time-block">
                <img src={src} alt={alt} className="hourly-forecast__icon" />
                <time className="hourly-forecast__time" dateTime={hour.time.toISOString()}>{formatHour(hour.time)}</time>
              </div>
                          
              <span 
                className="hourly-forecast__temperature"
                aria-label={`Temperature ${temp} degrees at ${formatAriaDateTime(hour.time)}`}
              >
                {temp}°
              </span>
            </li>
          )
        })}
      </ul>      
    </section>
  );
}