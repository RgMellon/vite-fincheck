import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../../useDashboard";

interface AccountCardProps {
  name: string;
  balance: number;
  color: string;
  type: "CASH" | "CHECKING" | "INVESTMENT";
}
export function AccountCard({ name, balance, color, type }: AccountCardProps) {
  const { areValueVisibility } = useDashboard();
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-grape-800 font-medium tracking-[-0.5px] mt-4 block">
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
          {formatCurrency(balance)}
        </span>

        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
