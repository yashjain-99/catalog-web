import { useQuery } from "react-query";
import { getStockData } from "./api";

export function useGetStockData(interval: Interval) {
  let params = "";
  switch (interval) {
    case "1d":
      params = "day";
      break;
    case "3d":
      params = "day?nums=three";
      break;
    case "1w":
      params = "week";
      break;
    case "1m":
      params = "month";
      break;
    case "6m":
      params = "month?nums=six";
      break;
    case "1y":
      params = "year";
      break;
    case "max":
      params = "max";
      break;
    default:
      params = "day";
  }
  return useQuery({
    queryKey: [interval],
    queryFn: () => getStockData(params),
  });
}
