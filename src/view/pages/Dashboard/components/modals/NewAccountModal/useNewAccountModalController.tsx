import { useForm } from "react-hook-form";
import { useDashboard } from "../../../useDashboard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../app/services/bankAccount";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome obrigatório"),
  type: z.enum(["CASH", "CHECKING", "INVESTIMENT"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const queryClient = useQueryClient();
  const { isNewAccountModalOpen, openNewAccountModal, closeNewAccountModal } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation(bankAccountService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta cadastrada com sucesso");
      closeNewAccountModal();

      reset();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar conta, tente novamente mais tarde");
    }
  });

  return {
    isNewAccountModalOpen,
    openNewAccountModal,
    closeNewAccountModal,
    register,
    handleSubmit,
    errors,
    control,
    isLoading,
  };
}
