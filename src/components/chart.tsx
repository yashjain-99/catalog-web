import {
  createChart,
  ColorType,
  AreaData,
  Time,
  HistogramData,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartComponentProps {
  data: { time: number; value: number }[];
  interval: Interval;
  volume: { time: number; value: number }[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const {
    data,
    interval,
    volume,
    colors: {
      backgroundColor = "white",
      lineColor = "#4B40EE",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "#E8E7FF",
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: interval === "1d",
        secondsVisible: false,
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data as AreaData<Time>[]);

    const volumeSeries = chart.addHistogramSeries({
      color: "#E6E8EB",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    volumeSeries.setData(volume as HistogramData<Time>[]);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export default ChartComponent;
