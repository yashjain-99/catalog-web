import React, { createContext, useState, ReactNode } from "react";

interface IntervalContextType {
  interval: Interval;
  setInterval: React.Dispatch<React.SetStateAction<Interval>>;
}

const IntervalContext = createContext<IntervalContextType | undefined>(
  undefined
);

export const IntervalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [interval, setInterval] = useState<Interval>("1d");

  return (
    <IntervalContext.Provider value={{ interval, setInterval }}>
      {children}
    </IntervalContext.Provider>
  );
};

export const useIntervalContext = () => {
  const context = React.useContext(IntervalContext);
  if (!context) {
    throw new Error(
      "useIntervalContext must be used within a IntervalProvider"
    );
  }
  return context;
};
