import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { IntervalProvider } from "./contexts/IntervalContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntervalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </IntervalProvider>
  </StrictMode>
);
