import { mockWeather } from "../../mockData";
import SunnyIcon from "../../assets/images/icon-sunny.webp";
import DropDownIcon from "../../assets/images/icon-dropdown.svg";
import "./HourlyForecast.css";
import { OptionsWindow } from "../../shared/OptionsWindow";
import { useContextMenu } from "../../hooks/useContextMenu";

export function HourlyForecast() {
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  
  const data = mockWeather.hourly;
  const today = "Tuesday";
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
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
            <span className="hourly-forecast__button-text">{today}</span>
            <img src={DropDownIcon} alt="" className="hourly-forecast__dropdown-icon"/> 
          </button>

					{ openId === "day" && menuPosition &&
						<OptionsWindow position={menuPosition!} onClose={closeMenu}>
							<ul 
								id="days-menu" 
								className="hourly-forecast__menu"
								role="menu"
							>
								{daysOfWeek.map(day => (
									<li key={day}>
										<button
											className="hourly-forecast__menu-item"
											role="menuitem"
										>
											{day}
										</button>
									</li>
								))}
							</ul>
						</OptionsWindow>
					}
        </div>   
      </div>
      
      <ul className="hourly-forecast__list">
        { data.map((hour, index) => 
          <li key={index} className="hourly-forecast__item">
            <div className="hourly-forecast__time-block">
              <img src={SunnyIcon} alt="Sunny" className="hourly-forecast__icon" />
              <time className="hourly-forecast__time" dateTime={hour.time}>{hour.time}</time>
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