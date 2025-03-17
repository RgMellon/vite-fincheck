import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  name: z.string().nonempty("Nome obrigatório"),
  value: z.union([z.string().nonempty("Valor é obrigatório"), z.number()]),
  date: z.date(),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe o tipo de conta"),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLoading, mutateAsync } = useMutation(transactionsService.update);
  const { isLoading: isLoadingDeleteModal, mutateAsync: removeTransaction } =
    useMutation(transactionsService.remove);
  const { accounts, isFetching: isFetchingAccounts } = useBankAccounts();
  const { categories: categorisList } = useCategories();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction.date) : new Date(),
      name: transaction?.name,
      value: transaction?.value,
    },
  });

  const categories = useMemo(() => {
    return categorisList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categorisList, transaction]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!transaction?.id) return;

      await mutateAsync({
        ...data,
        id: transaction.id,
        date: data.date.toISOString(),
        type: transaction!.type!,
        value: currencyStringToNumber(data.value),
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Editado com sucesso!  ✍🏻");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao editar transação, tente novamente mais tarde");
    }
  });

  function handleCloseDeleteModalOpen() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(`${transaction?.id}`);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Transação deletada com sucesso");
      onClose();
    } catch (err) {
      console.log("err", err);
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
    control,
    accounts,
    isFetchingAccounts,
    categories,
    isDeleteModalOpen,
    handleCloseDeleteModalOpen,
    isLoadingDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
  };
}
