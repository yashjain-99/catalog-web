import React from "react";
import Spinner from "./spinner";

const ChartLoader = () => {
  return (
    <div className="flex w-full h-[300px] border-r-2 border-l-2 items-center justify-center">
      <Spinner />
    </div>
  );
};

export default ChartLoader;
