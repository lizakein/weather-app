export type RawVariable = {
  value?: () => number | string;
  valuesArray?: () => Float32Array | null;
};

type RawCurrent = {
  time: () => number | string;
  variables: (idx: number) => RawVariable | undefined;
};

type RawSeries = {
  time: () => number | string;
  timeEnd: () => number | string;
  interval: () => number;
  variables: (idx: number) => RawVariable | undefined;
};

 export type RawResponse = {
  utcOffsetSeconds: () => number;
  current: () => RawCurrent | undefined;
  hourly: () => RawSeries | undefined;
  daily: () => RawSeries | undefined;
};