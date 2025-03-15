import { useEffect, useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilterParam } from "../../../../../app/services/transactionsService/getAll";

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilterParam>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { data, isFetching, isInitialLoading, refetch } =
    useTransactions(filters);

  function handleOpenFilterModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpen(false);
  }

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleMonthChange(month: number) {
    setFilters((prevState) => ({
      ...prevState,
      month,
    }));
  }

  return {
    isInitialLoading,
    isLoading: isFetching,
    transactions: data,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleMonthChange,
    filters,
  };
}
