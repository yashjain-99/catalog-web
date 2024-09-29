import { StockData } from "@/types/api";
import axios from "axios";

const BASE_URL = `${window.location.origin}/api`;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getStockData = async (params: string): Promise<StockData> => {
  const response = await axiosInstance.get<StockData>(params);
  return response.data;
};
