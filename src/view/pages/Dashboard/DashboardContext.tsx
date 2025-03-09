import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
  areValueVisibility: boolean;
  toggleValueVisibility(): void;
  isNewAccountModalOpen: boolean;
  closeNewAccountModal(): void;
  openNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal(): void;
  openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
  newTransactionType: "INCOME" | "EXPENSE" | null;
}

export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValueVisibility, setAreValueVisibility] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [newTransactionType, setNewTransactionType] = useState<
    "INCOME" | "EXPENSE" | null
  >(null);

  function toggleValueVisibility() {
    setAreValueVisibility((prevState) => !prevState);
  }

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValueVisibility,
        toggleValueVisibility,
        isNewAccountModalOpen,
        closeNewAccountModal,
        openNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
