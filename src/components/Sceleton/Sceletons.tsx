// components/Skeletons.tsx
export function CurrentWeatherSkeleton() {
  return (
    <section className="weather">
      {/* Header */}
      <div className="skeleton-block weather__header" style={{ height: "280px", backgroundImage: "none", borderRadius: "1.5rem" }}>
        <div className="loading">
          <div className="loading__dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="loading__text">Loading...</div>
        </div>      
      </div>

      {/* Details */}
      <div className="weather__details" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        {Array(4).fill(null).map((_, i) => (
          <div key={i} className="skeleton-block weather__detail" style={{ height: "120px" }} />
        ))}
      </div>
    </section>
  );
}

export function DailyForecastSkeleton() {
  return (
    <section className="daily-forecast">
      <div className="daily-forecast__title" style={{ height: "30px", width: "150px", marginBottom: "1.25rem" }}>
        Daily forecast
      </div>
      <ul className="daily-forecast__list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(5.25rem, 1fr))", gap: "1rem" }}>
        {Array(7).fill(null).map((_, i) => (
          <li key={i} className="skeleton-block daily-forecast__item" style={{ height: "170px" }} />
        ))}
      </ul>
    </section>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <section className="hourly-forecast">
      <div className="hourly-forecast__header" style={{ display: "flex", justifyContent: "space-between"}}>
        <div className="hourly-forecast__title" style={{ width: "160px", height: "24px" }}>
          Hourly forecast
        </div>
        <div className="skeleton-block hourly-forecast__button" style={{ width: "120px", height: "37px", borderRadius: "0.5rem" }} />
      </div>

      <ul className="hourly-forecast__list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Array(8).fill(null).map((_, i) => (
          <li key={i} className="skeleton-block hourly-forecast__item" style={{ height: "62px" }} />
        ))}
      </ul>
    </section>
  );
}
