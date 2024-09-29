import { useIntervalContext } from "@/contexts/IntervalContext";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { formatStockData } from "@/lib/utils";
import { useGetStockData } from "@/services/queries";
import React, { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ChartLoader from "./loader/chart-loader";
import { CHART_COLORS_DARK, CHART_COLORS_LIGHT } from "@/lib/constants";

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

  const colors = theme === "dark" ? CHART_COLORS_DARK : CHART_COLORS_LIGHT;

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
