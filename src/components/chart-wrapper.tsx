import { formatStockData } from "@/lib/utils";
import { useIntervalContext } from "@/contexts/IntervalContext";
import { useGetStockData } from "@/services/queries";
import React, { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ChartLoader from "./loader/chart-loader";
import { useThemeContext } from "@/contexts/ThemeProvider";

const ChartWrapper = () => {
  const [closingPrices, setClosingPrices] = useState<
    { time: number; value: number }[]
  >([]);
  const [volume, setVolume] = useState<{ time: number; value: number }[]>([]);
  const { interval } = useIntervalContext();
  const { theme } = useThemeContext();

  const { data, isLoading, isError } = useGetStockData(interval);

  useEffect(() => {
    if (data) {
      const { closingPrices, volume } = formatStockData(data);
      setClosingPrices(closingPrices);
      setVolume(volume);
    }
  }, [data]);

  if (isError) {
    return <div>Error fetching data in chart</div>;
  }

  if (isLoading) {
    return <ChartLoader />;
  }

  const colors =
    theme === "dark"
      ? {
          backgroundColor: "#1E1E1E",
          lineColor: "#4B40EE",
          textColor: "white",
          areaTopColor: "#2962FF",
          areaBottomColor: "#E8E7FF",
        }
      : {
          backgroundColor: "white",
          lineColor: "#4B40EE",
          textColor: "black",
          areaTopColor: "#A7C8FF",
          areaBottomColor: "#E8E7FF",
        };

  return (
    <ChartComponent
      data={closingPrices}
      interval={interval}
      volume={volume}
      colors={colors}
    />
  );
};

export default React.memo(ChartWrapper);
