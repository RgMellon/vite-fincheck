import { useForm } from "react-hook-form";
import { useDashboard } from "../../../useDashboard";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  name: z.string().nonempty("Nome obrigatório"),
  value: z.string().nonempty("Valor obrigatório"),
  date: z.date(),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe o tipo de conta"),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const queryClient = useQueryClient();

  const {
    isNewTransactionModalOpen,
    openNewAccountModal,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    reset,
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { isLoading, mutateAsync } = useMutation(transactionsService.create);
  const { accounts, isFetching: isFetchingAccounts } = useBankAccounts();
  const { categories: categorisList } = useCategories();

  const categories = useMemo(() => {
    return categorisList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categorisList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    const { bankAccountId, categoryId, date, name, value } = data;
    try {
      await mutateAsync({
        bankAccountId,
        categoryId,
        date: date.toISOString(),
        name,
        type: newTransactionType!,
        value: currencyStringToNumber(value),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Cadastrado com sucesso!  ✍🏻");
      closeNewTransactionModal();

      reset();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar conta, tente novamente mais tarde");
    }
  });

  return {
    isNewTransactionModalOpen,
    openNewAccountModal,
    closeNewTransactionModal,
    newTransactionType,
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
    accounts,
    isFetchingAccounts,
    categories,
  };
}
