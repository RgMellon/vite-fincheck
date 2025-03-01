import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { SignUpParams } from "../../../app/services/authService/signUp";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("Campo não pode ser vazio"),
  email: z
    .string()
    .email("E-mail inválido")
    .nonempty("Campo não pode ser vazio"),
  password: z
    .string()
    .min(8, "Mínimo 8 letras")
    .nonempty("Campo não pode ser vazio"),
});

type FormType = {
  name: string;
  email: string;
  password: string;
};

export function useRegistrerController() {
  const {
    handleSubmit: hookHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignUpParams) => {
      return authService.signUp(data);
    },
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro");
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
  };
}
