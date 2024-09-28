export type API_FUNCTIONS =
  | "TIME_SERIES_INTRADAY"
  | "TIME_SERIES_DAILY_ADJUSTED"
  | "TIME_SERIES_WEEKLY_ADJUSTED"
  | "TIME_SERIES_MONTHLY_ADJUSTED";

export type TimeSeriesKey =
  | "Time Series (5min)"
  | "Time Series (Daily)"
  | "Weekly Adjusted Time Series"
  | "Monthly Adjusted Time Series";

interface MetaData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
}

export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
}

export type TimeSeries = {
  [key in TimeSeriesKey]: {
    [date: string]: TimeSeriesData;
  };
};

export interface StockData extends MetaData, TimeSeries {}
