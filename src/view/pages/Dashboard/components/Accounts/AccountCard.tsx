import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../../useDashboard";

interface AccountCardProps {
  data: BankAccount;
}
export function AccountCard({ data }: AccountCardProps) {
  const { name, color, type, currentBalance } = data;
  const { areValueVisibility, openEditModalBankAccount } = useDashboard();
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] border-b-4 border-teal-950"
      role="button"
      onClick={() => {
        openEditModalBankAccount(data);
      }}
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValueVisibility && "blur-md"
          )}
        >
          {formatCurrency(currentBalance)}
        </span>

        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
