import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/AuthContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
