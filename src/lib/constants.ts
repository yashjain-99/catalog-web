import { TimeSeriesKey } from "@/types/api";

export const COLUMNS = Object.seal([
  { columnName: "Summary", alias: "summary" },
  { columnName: "Chart", alias: "chart" },
  { columnName: "Statistics", alias: "statistics" },
  { columnName: "Analysis", alias: "analysis" },
  { columnName: "Settings", alias: "settings" },
]);

export const INTERVALS: Interval[] = Object.seal([
  "1d",
  "3d",
  "1w",
  "1m",
  "6m",
  "1y",
  "max",
]);

export const INTERVAL_TO_TIME_SERIES_KEY: { [key in Interval]: TimeSeriesKey } =
  {
    "1d": "Time Series (5min)",
    "3d": "Time Series (Daily)",
    "1w": "Time Series (Daily)",
    "1m": "Weekly Adjusted Time Series",
    "6m": "Monthly Adjusted Time Series",
    "1y": "Monthly Adjusted Time Series",
    max: "Monthly Adjusted Time Series",
  };

export const SIZE: { [key in Interval]: number } = Object.seal({
  "1d": -1,
  "3d": 3,
  "1w": 7,
  "1m": 30,
  "6m": 6,
  "1y": 12,
  max: -1,
});
