import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";

const schema = z.object({
  password: z.string().nonempty("Senha obrigatória").min(8),
  email: z.string().email("Email deve ser valido").nonempty(),
});

type FormSignInParams = {
  password: string;
  email: string;
};

export function useLoginController() {
  const {
    handleSubmit: hookHandleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: FormSignInParams) => {
      return authService.signIn(data);
    },
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const response = await mutateAsync(data);
      console.log(response.data.accesToken);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao fazer login, tente mais tarde");
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
