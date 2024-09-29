import MainErrorFallback from "@/components/error/main-error-fallback";
import { IntervalProvider } from "@/contexts/IntervalContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";

// Initialize the query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={MainErrorFallback}>
    <ThemeProvider>
      <IntervalProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </IntervalProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default AppProvider;
