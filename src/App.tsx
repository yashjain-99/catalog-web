import { useEffect, useState } from "react";
import { useIntervalContext } from "./contexts/IntervalContext";
import Menu from "./components/menu";
import { columns, intervals } from "./_lib/constants";
import { formatStockData } from "./_lib/helpers";
import Header from "./components/header";

const App = () => {
  const { interval, setInterval } = useIntervalContext();
  const [closingPrices, setClosingPrices] = useState({});
  const [lastTradingPrice, setLastTradingPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [selectedTab, setSelectedTab] = useState("chart");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const intervalParam = queryParams.get("interval");
    if (intervalParam && intervals.includes(intervalParam)) {
      setInterval(intervalParam as Interval);
    }
  }, [setInterval]);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
    )
      .then((res) => res.json())
      .then((res) => {
        const { closingPrices, lastTradingPrice, priceChange } =
          formatStockData(res);
        setClosingPrices(closingPrices);
        setLastTradingPrice(lastTradingPrice);
        setPriceChange(priceChange);
      });
  }, [interval]);
  return (
    <div className="flex flex-col w-full min-h-dvh bg-background text-foreground px-8 py-12 gap-8">
      <Header lastTradingPrice={lastTradingPrice} priceChange={priceChange} />
      <main className="">
        <Menu
          columns={columns}
          handleTabChange={(alias) => {
            setSelectedTab(alias);
          }}
          layoutId="tabs"
          selectedTab={selectedTab}
        />
      </main>
    </div>
  );
};

export default App;
