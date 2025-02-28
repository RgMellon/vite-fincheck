import { Outlet } from "react-router-dom";
import ilustration from "../../assets/ilustration.png";
import { Logo } from "../components/logo";

export function AuthLayout() {
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full justify-center items-center flex flex-col lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8 lg:px-0">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full  justify-center items-center p-8 hidden lg:flex">
        <img
          src={ilustration}
          className="object-cover w-full h-full max-w-[650px] max-h-[960px] rounded-b-[32px] "
        />

        <div className="absolute max-w-[656px] bottom-8 p-10 mx-8 rounded-b-[32px] bg-gray-50">
          <Logo className="text-teal-700 h-6" />

          <p className="text-gray-700 font-medium text-xl mt-1">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de gratis
          </p>
        </div>
      </div>
    </div>
  );
}
