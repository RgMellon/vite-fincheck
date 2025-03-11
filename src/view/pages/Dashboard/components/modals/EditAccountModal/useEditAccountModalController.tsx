import { useForm } from "react-hook-form";
import { useDashboard } from "../../../useDashboard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../app/services/bankAccount";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome obrigatório"),
  type: z.enum(["CASH", "CHECKING", "INVESTMENT"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  const {
    isEditModalBankAccountOpen,
    openEditModalBankAccount,
    closeEditModalBankAccount,
    accountBeingEdited,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.currentBalance,
      type: accountBeingEdited?.type,
    },
  });

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountService.update
  );

  const { isLoading: isLoadingRemoveAccount, mutateAsync: removeAccount } =
    useMutation(bankAccountService.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta Editada com sucesso");
      closeEditModalBankAccount();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar conta, tente novamente mais tarde");
    }
  });

  const handleDeleteAccount = async () => {
    try {
      await removeAccount(`${accountBeingEdited?.id}`);
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta deletada com sucesso");

      closeEditModalBankAccount();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao remover conta");
    }
  };

  return {
    isEditModalBankAccountOpen,
    openEditModalBankAccount,
    closeEditModalBankAccount,
    register,
    handleSubmit,
    errors,
    control,
    isLoading,
    handleDeleteModalClose,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleDeleteAccount,
    isLoadingRemoveAccount,
  };
}
