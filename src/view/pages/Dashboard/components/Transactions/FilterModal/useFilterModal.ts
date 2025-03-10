import { useState } from "react";

export function useFilterModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? null : bankAccountId
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    handleChangeYear,
    selectedYear,
  };
}
