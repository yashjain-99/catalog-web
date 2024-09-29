import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { IntervalProvider } from "./contexts/IntervalContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { makeServer } from "./mirage/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
makeServer();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntervalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </IntervalProvider>
  </StrictMode>
);
