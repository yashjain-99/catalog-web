export const columns = Object.seal([
  { columnName: "Summary", alias: "summary" },
  { columnName: "Chart", alias: "chart" },
  { columnName: "Statistics", alias: "statistics" },
  { columnName: "Analysis", alias: "analysis" },
  { columnName: "Settings", alias: "settings" },
]);

export const intervals: Interval[] = Object.seal([
  "1d",
  "3d",
  "1w",
  "1m",
  "6m",
  "1y",
  "max",
]);
