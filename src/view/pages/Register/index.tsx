import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegistrerController } from "./useRegisterController";

export function Register() {
  const { register, errors, handleSubmit } = useRegistrerController();
  return (
    <div className="mt-2">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Ja possui uma conta?
          </span>
          <Link
            to="/login"
            className="tracking-[-0.5px] font-medium text-teal-900"
          >
            {" "}
            Fazer login
          </Link>
        </p>
      </header>

      <form onClick={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          {...register("name")}
          type="text"
          placeholder="Nome"
          error={errors?.name?.message}
        />
        <Input
          {...register("email")}
          type="email"
          placeholder="E-mail"
          error={errors?.email?.message}
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="Senha"
          error={errors?.password?.message}
        />
        <Button>Criar conta</Button>
      </form>
    </div>
  );
}
