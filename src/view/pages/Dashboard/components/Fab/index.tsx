import { PlusIcon } from "@radix-ui/react-icons";
import { Dropdown } from "../../../../components/DropdownMenu";
import { Income } from "../../../../components/icons/categories/income/Income";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashboard } from "../../useDashboard";

export function Fab() {
  const { openNewAccountModal } = useDashboard();
  return (
    <div className="fixed bottom-4 right-4">
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button className="flex rounded-full justify-center  items-center bg-teal-900 w-12 h-12 text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item className="gap-2">
            <Expense />
            Nova Despesa
          </Dropdown.Item>

          <Dropdown.Item className="gap-2">
            <Income />
            Nova Receita
          </Dropdown.Item>

          <Dropdown.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}
