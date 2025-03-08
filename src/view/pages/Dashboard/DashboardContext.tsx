import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
  areValueVisibility: boolean;
  toggleValueVisibility(): void;
  isNewAccountModalOpen: boolean;
  closeNewAccountModal(): void;
  openNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValueVisibility, setAreValueVisibility] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  function toggleValueVisibility() {
    setAreValueVisibility((prevState) => !prevState);
  }

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValueVisibility,
        toggleValueVisibility,
        isNewAccountModalOpen,
        closeNewAccountModal,
        openNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
