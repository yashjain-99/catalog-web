import { createServer } from "miragejs";
import {
  STOCK_DATA_DAY,
  STOCK_DATA_MAX,
  STOCK_DATA_MONTH,
  STOCK_DATA_SIX_MONTH,
  STOCK_DATA_THREE_DAY,
  STOCK_DATA_WEEK,
  STOCK_DATA_YEAR,
} from "./constants";

export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,

    routes() {
      this.namespace = "api";

      this.get("/day", (schema, req) => {
        const { nums } = req.queryParams;
        if (nums === "three") return STOCK_DATA_THREE_DAY;
        return STOCK_DATA_DAY;
      });
      this.get("/week", () => {
        return STOCK_DATA_WEEK;
      });
      this.get("/month", (schema, req) => {
        const { nums } = req.queryParams;
        if (nums === "six") return STOCK_DATA_SIX_MONTH;
        return STOCK_DATA_MONTH;
      });
      this.get("/year", () => {
        return STOCK_DATA_YEAR;
      });
      this.get("/max", () => {
        return STOCK_DATA_MAX;
      });
    },
  });

  return server;
}
