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

export const CHART_COLORS_DARK = {
  backgroundColor: "#1E1E1E",
  lineColor: "#4B40EE",
  textColor: "white",
  areaTopColor: "#2962FF",
  areaBottomColor: "#E8E7FF",
};

export const CHART_COLORS_LIGHT = {
  backgroundColor: "white",
  lineColor: "#4B40EE",
  textColor: "black",
  areaTopColor: "#A7C8FF",
  areaBottomColor: "#E8E7FF",
};
