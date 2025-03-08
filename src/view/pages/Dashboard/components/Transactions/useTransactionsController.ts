import { useState } from "react";

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  function handleOpenFilterModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpen(false);
  }

  return {
    isInitialLoading: false,
    isLoading: true,
    transactions: [],
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
  };
}
