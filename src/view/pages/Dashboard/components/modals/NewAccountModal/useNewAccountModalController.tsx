import { useDashboard } from "../../../useDashboard";

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, openNewAccountModal, closeNewAccountModal } =
    useDashboard();

  return {
    isNewAccountModalOpen,
    openNewAccountModal,
    closeNewAccountModal,
  };
}
