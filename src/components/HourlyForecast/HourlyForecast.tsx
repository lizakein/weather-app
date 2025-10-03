import { useMemo, useState } from "react";
import type { WeatherData } from "../../types/weather";
import { useContextMenu } from "../../hooks/useContextMenu";
import { transformHourly } from "../../utils/transformHourly";
import { formatAriaDateTime, formatHour } from "../../utils/format";

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

  const filteredData = useMemo(() => {
    const now = new Date();
    const currentHour = new Date(now);
    currentHour.setMinutes(0, 0, 0);

    return hourlyData.filter(hour => {
      const sameDay = (
        hour.time.getDate() === selectedDay.getDate() &&
        hour.time.getMonth() === selectedDay.getMonth()
      );

      if (sameDay && selectedDay.toDateString() === now.toDateString())
        return hour.time >= currentHour;

      return sameDay;
    });
  }, [hourlyData, selectedDay]);
  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return (
    <section className="hourly-forecast" aria-label="Hourly forecast">
      <div className="hourly-forecast__header">
        <h2 className="hourly-forecast__title">Hourly forecast</h2>

        <div className="hourly-forecast__dropdown">
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
      
      <ul className="hourly-forecast__list" aria-label="Hourly temperatures">
        { filteredData.map((hour) => {
          const now = new Date();
          const currentHour = new Date(now);
          currentHour.setMinutes(0, 0, 0);

          const isCurrentHour = hour.time.getTime() === currentHour.getTime();

          return (
            <li 
              key={hour.time.toISOString()} 
              className={`hourly-forecast__item ${isCurrentHour ? "hourly-forecast__item--current" : ""}`}
            >
              <div className="hourly-forecast__time-block">
                <img 
                  src={hour.weather_code.src} 
                  alt={hour.weather_code.alt} 
                  className="hourly-forecast__icon" 
                />
                <time 
                  className="hourly-forecast__time" 
                  dateTime={hour.time.toISOString()}
                >
                  {formatHour(hour.time)}
                </time>
              </div>
                          
              <span 
                className="hourly-forecast__temperature"
                aria-label={`Temperature ${hour.temperature_2m} degrees at ${formatAriaDateTime(hour.time)}`}
              >
                {hour.temperature_2m}°
              </span>
            </li>
          )
        })}
      </ul>      
    </section>
  );
}