export interface TimeSeriesData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockData {
  data: { [date: string]: TimeSeriesData };
}
