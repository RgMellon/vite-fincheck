import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const handleSubmit = hookHandleSubmit((data) => {
    console.log("enviar dados para apo", data);
  });

  return {
    handleSubmit,
    register,
    errors,
  };
}
