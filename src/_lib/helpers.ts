interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface DailyTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface StockData {
  "Meta Data": MetaData;
  "Time Series (Daily)": {
    [date: string]: DailyTimeSeries;
  };
}

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
  data: StockData
): {
  lastTradingPrice: number;
  closingPrices: { time: string; value: number }[];
  priceChange: number;
} => {
  let lastTradingPrice = 0;
  let priceChange = 0;
  const closingPrices = Object.entries(data["Time Series (Daily)"]).map(
    (entry, idx) => {
      const tradingPrice = parseFloat(entry[1]["4. close"]);
      if (idx == 0) lastTradingPrice = tradingPrice;
      if (idx == 1) priceChange = lastTradingPrice - tradingPrice;
      return { time: entry[0], value: parseFloat(entry[1]["4. close"]) };
    }
  );
  closingPrices.reverse();
  return { lastTradingPrice, closingPrices, priceChange };
};
