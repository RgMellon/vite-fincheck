import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../app/entities/BankAccount";

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

  openEditModalBankAccount(bankAccount: BankAccount): void;
  isEditModalBankAccountOpen: boolean;
  closeEditModalBankAccount(): void;
  accountBeingEdited: null | BankAccount;
}

export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValueVisibility, setAreValueVisibility] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [isEditModalBankAccountOpen, setIsNewEditModalBankAccountOpen] =
    useState(false);

  const [newTransactionType, setNewTransactionType] = useState<
    "INCOME" | "EXPENSE" | null
  >(null);

  const [accountBeingEdited, setAccountBeingEdit] =
    useState<BankAccount | null>(null);

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

  const openEditModalBankAccount = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdit(bankAccount);
    setIsNewEditModalBankAccountOpen(true);
  }, []);

  const closeEditModalBankAccount = useCallback(() => {
    setIsNewEditModalBankAccountOpen(false);
    setAccountBeingEdit(null);
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
        closeEditModalBankAccount,
        openEditModalBankAccount,
        isEditModalBankAccountOpen,
        accountBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
