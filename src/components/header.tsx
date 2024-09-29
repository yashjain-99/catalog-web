import {
  calculatePercentChange,
  formatPrice,
  formatStockData,
} from "@/lib/utils";
import { useGetStockData } from "@/services/queries";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [lastTradingPrice, setLastTradingPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const { data, isLoading, isError } = useGetStockData("1d");
  useEffect(() => {
    if (data) {
      const { lastTradingPrice, priceChange } = formatStockData(data);
      setLastTradingPrice(lastTradingPrice);
      setPriceChange(priceChange);
    }
  }, [data]);
  if (isError) {
    return "Error fetching data in header";
  }
  if (isLoading) {
    return "Loading ...";
  }
  return (
    <header className="flex flex-col gap-2">
      <div className="flex font-inter">
        <span className="text-3xl lg:text-4xl font-bold">
          {formatPrice(lastTradingPrice)}
        </span>
        <sup className=" font-medium text-base text-muted-foreground mt-2">
          USD
        </sup>
      </div>
      <div
        className={`${
          priceChange > 0 ? " text-green-600" : " text-red-600"
        } flex gap-1`}
      >
        <span className={`${priceChange > 0}`}>{formatPrice(priceChange)}</span>
        <div>
          <span>{"( "}</span>
          <span>
            {formatPrice(calculatePercentChange(priceChange, lastTradingPrice))}
          </span>
          <span>%</span>
          <span>{" )"}</span>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
