export type UnitOption = { label: string; value: string };
export type UnitsGroupConfig = {
  id: string;
  section: string;
  ariaLabel: string;
  options: UnitOption[];
  default?: string;
};

export const UNITS_CONFIG: UnitsGroupConfig[] = [
  {
    id: "temperature",
    section: "Temperature",
    ariaLabel: "Temperature units",
    options: [
      { label: "Celsius (°C)", value: "celsius" },
      { label: "Fahrenheit (°F)", value: "fahrenheit" }
    ]
  },
  {
    id: "wind",
    section: "Wind Speed",
    ariaLabel: "Wind Speed units",
    options: [
      { label: "km/h", value: "kmh" },
      { label: "mph", value: "mph" }
    ]
  },
  {
    id: "precipitation",
    section: "Precipitation",
    ariaLabel: "Precipitation units",
    options: [
      { label: "Millimeters (mm)", value: "mm" },
      { label: "Inches (in)", value: "in" }
    ]
  }
];
