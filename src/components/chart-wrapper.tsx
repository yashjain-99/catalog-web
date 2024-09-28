import { formatStockData } from "@/lib/utils";
import { useIntervalContext } from "@/contexts/IntervalContext";
import { useGetStockData } from "@/services/queries";
import React, { useEffect, useState } from "react";
import ChartComponent from "./chart";

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
    return "Loading ...";
  }

  return <ChartComponent data={closingPrices} />;
};

export default React.memo(ChartWrapper);
