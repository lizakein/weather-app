import DrizzleIcon from "../assets/images/icon-drizzle.webp";
import FogIcon from "../assets/images/icon-fog.webp";
import OvercastIcon from "../assets/images/icon-overcast.webp";
import PartlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import RainIcon from "../assets/images/icon-rain.webp";
import SnowIcon from "../assets/images/icon-snow.webp";
import StormIcon from "../assets/images/icon-storm.webp";
import SunnyIcon from "../assets/images/icon-sunny.webp";

export type WeatherIcon = {
  src: string;
  alt: string;
};

export function getWeatherIcon(code: number): WeatherIcon {
  if ([51, 53, 55, 56, 57].includes(code)) return { src: DrizzleIcon, alt: "Drizzle" };
  if ([45, 48].includes(code)) return { src: FogIcon, alt: "Fog" };
  if ([3].includes(code)) return { src: OvercastIcon, alt: "Overcast" };
  if ([1, 2].includes(code)) return { src: PartlyCloudyIcon, alt: "Partly cloudy" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { src: RainIcon, alt: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { src: SnowIcon, alt: "Snow" };
  if ([95, 96, 99].includes(code)) return { src: StormIcon, alt: "Thunderstorm" };
  if ([0].includes(code)) return { src: SunnyIcon, alt: "Clear sky" };
  return { src: SunnyIcon, alt: "Unknown weather" };
}