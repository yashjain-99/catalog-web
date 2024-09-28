import { useQuery } from "react-query";
import { getStockData } from "./api";
import { API_FUNCTIONS } from "@/types/api";

export function useGetStockData(interval: Interval) {
  let func: API_FUNCTIONS = "TIME_SERIES_INTRADAY";
  if (["3d", "1w"].includes(interval)) {
    func = "TIME_SERIES_DAILY_ADJUSTED";
  } else if (interval === "1m") {
    func = "TIME_SERIES_WEEKLY_ADJUSTED";
  } else if (["6m", "1y", "max"].includes(interval)) {
    func = "TIME_SERIES_MONTHLY_ADJUSTED";
  }
  return useQuery({
    queryKey: [interval],
    queryFn: () => getStockData(func),
  });
}
