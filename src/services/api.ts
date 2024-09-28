import { API_FUNCTIONS, StockData } from "@/types/api";
import axios from "axios";

const BASE_URL = "https://www.alphavantage.co";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getStockData = async (func: API_FUNCTIONS): Promise<StockData> => {
  const response = await axiosInstance.get<StockData>("query", {
    params: {
      function: func,
      symbol: "IBM",
      ...(func == "TIME_SERIES_INTRADAY" && { interval: "5min" }),
      apikey: "demo",
    },
  });
  return response.data;
};
