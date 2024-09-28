import { useEffect, useState } from "react";
import { useIntervalContext } from "./contexts/IntervalContext";
import Menu from "./components/menu";
import { COLUMNS, INTERVALS } from "./lib/constants";
import Header from "./components/header";
import Actions from "./components/actions";
import ChartWrapper from "./components/chart-wrapper";

const App = () => {
  const { setInterval } = useIntervalContext();
  const [selectedTab, setSelectedTab] = useState("chart");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const intervalParam = queryParams.get("interval") as Interval;
    if (intervalParam && INTERVALS.includes(intervalParam)) {
      setInterval(intervalParam);
    }
  }, [setInterval]);

  return (
    <div className="flex flex-col w-full min-h-dvh bg-background text-foreground px-8 py-12 gap-8">
      <Header />
      <Menu
        columns={COLUMNS}
        handleTabChange={setSelectedTab}
        layoutId="tabs"
        selectedTab={selectedTab}
      />
      <main className="max-w-[calc(100%_-_25rem)]">
        <Actions />
        <ChartWrapper />
      </main>
    </div>
  );
};

export default App;
