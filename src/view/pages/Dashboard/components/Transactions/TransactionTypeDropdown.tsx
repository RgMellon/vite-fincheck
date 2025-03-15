import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { Dropdown } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface TransactionTypeDropdownParams {
  onSelect(type: "EXPENSE" | "INCOME" | undefined): void;
  selectedType: "EXPENSE" | "INCOME" | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownParams) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === "EXPENSE" && <ExpensesIcon />}
          {selectedType === "INCOME" && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium ">
            {selectedType === "EXPENSE" && "Despesas"}
            {selectedType === "INCOME" && "Receitas"}
            {selectedType === undefined && "Transações"}
          </span>

          <ChevronDownIcon className="text-gray-800" />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-full">
        <Dropdown.Item className="gap-2" onSelect={() => onSelect("INCOME")}>
          <IncomeIcon />
          Receitas
        </Dropdown.Item>

        <Dropdown.Item className="gap-2" onSelect={() => onSelect("EXPENSE")}>
          <ExpensesIcon />
          Despesas
        </Dropdown.Item>

        <Dropdown.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
