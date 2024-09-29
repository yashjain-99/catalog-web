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
  volume: { time: number; value: number; color: string }[];
} => {
  let lastTradingPrice = 0;
  let priceChange = 0;
  const timeSeriesKey = INTERVAL_TO_TIME_SERIES_KEY[interval];
  const size = SIZE[interval];

  const closingPricesEntries = Object.entries(data[timeSeriesKey]);
  const limitEntries =
    size === -1 ? closingPricesEntries : closingPricesEntries.slice(0, size);

  const closingPrices: { time: number; value: number }[] = [];
  const volume: { time: number; value: number; color: string }[] = [];

  limitEntries.forEach((entry, idx) => {
    const tradingPrice = parseFloat(entry[1]["4. close"]);
    const tradingVolume =
      interval === "1d"
        ? parseInt(entry[1]["5. volume"], 10)
        : parseInt(entry[1]["6. volume"], 10);

    const timestamp = Date.parse(entry[0]) / 1000;

    closingPrices.push({ time: timestamp, value: tradingPrice });
    volume.push({ time: timestamp, value: tradingVolume, color: "#fe6865" });

    // Set last trading price and price change for the first two entries
    if (idx === 0) lastTradingPrice = tradingPrice;
    if (idx === 1) priceChange = tradingPrice - lastTradingPrice;
  });

  // Reverse the closing prices and volume arrays
  closingPrices.reverse();
  volume.reverse();

  // Update color for volume based on the reversed array
  volume.forEach((v, i) => {
    if (i > 0) {
      v.color = v.value < volume[i - 1].value ? "#fe6865" : "#83f28f";
    }
  });

  return { lastTradingPrice, closingPrices, priceChange, volume };
};
