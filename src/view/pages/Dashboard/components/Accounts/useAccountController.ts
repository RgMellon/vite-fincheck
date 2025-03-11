import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccount";
import { useMemo } from "react";

export function useAccountController() {
  const { data = [], isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    isLoading: isFetching,
    accounts: data,
    currentBalance,
  };
}
