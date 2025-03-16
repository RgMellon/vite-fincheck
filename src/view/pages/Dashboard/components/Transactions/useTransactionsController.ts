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

  function handleChangeFilter<TFilter extends keyof TransactionsFilterParam>(
    filter: TFilter
  ) {
    return (value: TransactionsFilterParam[TFilter]) => {
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleAplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilter("bankAccountId")(bankAccountId);
    handleChangeFilter("year")(year);
  }

  return {
    isInitialLoading,
    isLoading: isFetching,
    transactions: data,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleChangeFilter,
    filters,
    handleAplyFilters,
  };
}
