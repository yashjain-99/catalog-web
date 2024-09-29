import { formatStockData } from "@/lib/utils";
import { useIntervalContext } from "@/contexts/IntervalContext";
import { useGetStockData } from "@/services/queries";
import React, { useEffect, useState } from "react";
import ChartComponent from "./chart";
import ChartLoader from "./loader/chart-loader";

const ChartWrapper = () => {
  const [closingPrices, setClosingPrices] = useState<
    { time: number; value: number }[] | []
  >([]);
  const { interval } = useIntervalContext();

  const { data, isLoading, isError } = useGetStockData(interval);
  useEffect(() => {
    if (data) {
      const { closingPrices } = formatStockData(data, interval);
      setClosingPrices(closingPrices);
    }
  }, [data, interval]);
  if (isError) {
    return "Error fetching data in chart";
  }
  if (isLoading) {
    return <ChartLoader />;
  }

  return <ChartComponent data={closingPrices} interval={interval} />;
};

export default React.memo(ChartWrapper);
