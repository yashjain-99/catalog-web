import { StockData } from "@/types/api";
import { INTERVAL_TO_TIME_SERIES_KEY, SIZE } from "./constants";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

export const calculatePercentChange = (
  priceChange: number,
  lastTradingPrice: number
): number => {
  return (priceChange / lastTradingPrice) * 100;
};

export const formatStockData = (
  data: StockData,
  interval: Interval = "1d"
): {
  lastTradingPrice: number;
  closingPrices: { time: number; value: number }[];
  priceChange: number;
} => {
  let lastTradingPrice = 0;
  let priceChange = 0;
  const timeSeriesKey = INTERVAL_TO_TIME_SERIES_KEY[interval];
  const size = SIZE[interval];

  const closingPricesEntries = Object.entries(data[timeSeriesKey]);

  const closingPrices = (
    size === -1 ? closingPricesEntries : closingPricesEntries.slice(0, size)
  ).map((entry, idx) => {
    const tradingPrice = parseFloat(entry[1]["4. close"]);
    if (idx === 0) lastTradingPrice = tradingPrice;
    if (idx === 1) priceChange = lastTradingPrice - tradingPrice;

    const date = Date.parse(`${entry[0]}`);
    const timestamp = date / 1000;

    return {
      time: timestamp,
      value: tradingPrice,
    };
  });

  closingPrices.reverse();

  return { lastTradingPrice, closingPrices, priceChange };
};
