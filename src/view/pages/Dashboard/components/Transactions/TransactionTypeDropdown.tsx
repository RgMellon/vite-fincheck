import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { Dropdown } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

export function TransactionTypeDropdown() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <button className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium ">
            Transações
          </span>
          <ChevronDownIcon className="text-gray-800" />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-full">
        <Dropdown.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </Dropdown.Item>

        <Dropdown.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </Dropdown.Item>

        <Dropdown.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
