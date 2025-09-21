export const mockWeather = {
  current: {
    date: "Tuesday, Aug 5, 2025",
    weather_code: 1,
    temperature_2m: 20,
    relative_humidity_2m: 46,
    precipitation: 0,
    wind_speed_10m: 14,
    apparent_temperature: 18,
  },
  daily: [
    { date: "Tue", weather_code: 2, temperature_2m_max: 20, temperature_2m_min: 14 },
    { date: "Wed", weather_code: 2, temperature_2m_max: 21, temperature_2m_min: 15 },
    { date: "Thu", weather_code: 2, temperature_2m_max: 24, temperature_2m_min: 15 },
    { date: "Fri", weather_code: 2, temperature_2m_max: 24, temperature_2m_min: 14 },
    { date: "Sat", weather_code: 2, temperature_2m_max: 25, temperature_2m_min: 13 },
    { date: "Sun", weather_code: 2, temperature_2m_max: 21, temperature_2m_min: 15 },
    { date: "Mon", weather_code: 2, temperature_2m_max: 25, temperature_2m_min: 16 },
  ],
  hourly: [
    { time: "3PM", weather_code: 2, temperature_2m: 20 },
    { time: "4PM", weather_code: 2, temperature_2m: 20 },
    { time: "5PM", weather_code: 2, temperature_2m: 20 },
    { time: "6PM", weather_code: 2, temperature_2m: 19 },
    { time: "7PM", weather_code: 2, temperature_2m: 18 },
    { time: "8PM", weather_code: 2, temperature_2m: 17 },
    { time: "9PM", weather_code: 2, temperature_2m: 17 },
  ]
};