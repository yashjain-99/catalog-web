import { useEffect, useState } from "react";
import { useIntervalContext } from "./contexts/IntervalContext";
import Menu from "./components/menu";
import { columns, intervals } from "./_lib/constants";
import { formatStockData } from "./_lib/helpers";
import Header from "./components/header";
import Actions from "./components/actions";
import ChartComponent from "./chart";

const App = () => {
  const { setInterval } = useIntervalContext();
  const [closingPrices, setClosingPrices] = useState<
    { time: string; value: number }[] | []
  >([]);
  const [lastTradingPrice, setLastTradingPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [selectedTab, setSelectedTab] = useState("chart");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const intervalParam = queryParams.get("interval") as Interval;
    if (intervalParam && intervals.includes(intervalParam)) {
      setInterval(intervalParam);
    }
  }, [setInterval]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        const { closingPrices, lastTradingPrice, priceChange } =
          formatStockData(data);
        setClosingPrices(closingPrices);
        setLastTradingPrice(lastTradingPrice);
        setPriceChange(priceChange);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-dvh bg-background text-foreground px-8 py-12 gap-8">
      <Header lastTradingPrice={lastTradingPrice} priceChange={priceChange} />
      <Menu
        columns={columns}
        handleTabChange={setSelectedTab}
        layoutId="tabs"
        selectedTab={selectedTab}
      />
      <main className="max-w-[calc(100%_-_25rem)]">
        <Actions />
        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && <ChartComponent data={closingPrices} />}
      </main>
    </div>
  );
};

export default App;
