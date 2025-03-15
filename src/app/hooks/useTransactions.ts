import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import { TransactionsFilterParam } from "../services/transactionsService/getAll";

export function useTransactions(filter: TransactionsFilterParam) {
  const {
    data = [],
    isFetching,
    isInitialLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filter),
  });

  return {
    isFetching,
    data,
    isInitialLoading,
    refetch,
  };
}
