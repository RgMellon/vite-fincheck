import { createContext, useState } from "react";

interface DashBoardContextValue {
  areValueVisibility: boolean;
  toggleValueVisibility(): void;
}

export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValueVisibility, setAreValueVisibility] = useState(false);

  function toggleValueVisibility() {
    setAreValueVisibility((prevState) => !prevState);
  }
  return (
    <DashboardContext.Provider
      value={{
        areValueVisibility,
        toggleValueVisibility,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
