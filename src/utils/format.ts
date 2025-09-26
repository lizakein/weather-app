export function formatNumber(value: number, decimal = 0): string {
  return value.toFixed(decimal);
}

export function formatDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short"});
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function formatHour(date: Date): string {
  return date.toLocaleDateString("en-US", {
    hour: "numeric",
    hour12: true
  });
}