import { Logo } from "../../components/logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { Fab } from "./components/Fab";
import { EditAccountModal } from "./components/modals/EditAccountModal";
import { NewAccountModal } from "./components/modals/NewAccountModal";
import { NewTransactionModal } from "./components/modals/NewTransactionModal";
import { Transactions } from "./components/Transactions";
import { DashboardContext, DashBoardProvider } from "./DashboardContext";

export function Dashboard() {
  return (
    <DashBoardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full px-4 md:px-8 pb-8 pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-center justify-between">
              <Logo className="h-6 text-teal-900" />
              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>
              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>

            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
            <Fab />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashBoardProvider>
  );
}
