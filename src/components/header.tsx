import { calculatePercentChange, formatPrice } from "@/_lib/helpers";

const Header = ({
  lastTradingPrice,
  priceChange,
}: {
  lastTradingPrice: number;
  priceChange: number;
}) => {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex font-inter">
        <span className="text-3xl lg:text-4xl font-bold">
          {formatPrice(lastTradingPrice)}
        </span>
        <sup className=" font-medium text-base text-[#475467] mt-2">USD</sup>
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

export default Header;
