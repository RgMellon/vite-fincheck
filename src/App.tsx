import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router />
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
