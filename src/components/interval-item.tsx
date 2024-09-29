import { useIntervalContext } from "@/contexts/IntervalContext";
import { motion } from "framer-motion";
const IntervalIetm = ({ interval }: { interval: Interval }) => {
  const { interval: selectedInterval, setInterval } = useIntervalContext();

  const changeInterval = (interval: Interval) => {
    setInterval(interval);
    const url = new URL(window.location.href);
    url.searchParams.set("interval", interval);
    window.history.pushState(null, "", url.toString());
  };

  return (
    <button
      className={`p-1 px-2 font-inter font-medium text-base relative ${
        selectedInterval === interval
          ? "text-white"
          : "text-gray-500 hover:text-[#4893FF]"
      } `}
      onClick={() => changeInterval(interval)}
    >
      <span className="z-10 relative">{interval}</span>

      {selectedInterval === interval && (
        <motion.div
          layoutId={`inteval_underline`}
          className="absolute inset-0 bg-[#4893FF] border border-transparent rounded-sm border-b-2 z-0"
        />
      )}
    </button>
  );
};

export default IntervalIetm;
