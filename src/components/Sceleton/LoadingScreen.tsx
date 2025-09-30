import { CurrentWeatherSkeleton, DailyForecastSkeleton, HourlyForecastSkeleton } from "./Sceletons";
import "./LoadingScreen.css";


export function LoadingScreen() {
  return (
    <div className="main-content">
      <div className="weather-card">
        <div className="weather-column">
          <CurrentWeatherSkeleton />
          <DailyForecastSkeleton />
        </div>

        <div className="weather-column weather-column--scroll">
          <div className="hourly-viewport">
            <HourlyForecastSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}