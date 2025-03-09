import { useDashboard } from "../../../useDashboard";

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    openNewAccountModal,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    openNewAccountModal,
    closeNewTransactionModal,
    newTransactionType,
  };
}
