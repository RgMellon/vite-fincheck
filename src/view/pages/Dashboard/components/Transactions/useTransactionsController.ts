import { useEffect, useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilterParam } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilterParam>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [editTransactionModalOpen, setEditTransactionModalOpen] =
    useState(false);

  const [transactionBeingEdited, setTransactionBeingEdit] =
    useState<null | Transaction>(null);

  const { data, isFetching, isInitialLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleOpenFilterModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpen(false);
  }

  function handleCloseEditTransactionModal() {
    setTransactionBeingEdit(null);
    setEditTransactionModalOpen(false);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setTransactionBeingEdit(transaction);
    setEditTransactionModalOpen(true);
  }

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
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
    editTransactionModalOpen,
    transactionBeingEdited,
  };
}
