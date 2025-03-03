import { Logo } from "../../components/logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

export function Dashboard() {
  return (
    <div className="w-full h-full px-8 pb-8 pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="h-6 text-teal-900 " />
        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Accounts />
        </div>
        <div className="w-full md:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  );
}
