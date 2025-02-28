import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  password: z.string().nonempty("Senha obrigatória").min(8),
  email: z.string().email("Email deve ser valido").nonempty(),
});

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

  const handleSubmit = hookHandleSubmit((data) => {
    console.log("enviar dados para a api", data);
  });

  return { handleSubmit, register, errors };
}
