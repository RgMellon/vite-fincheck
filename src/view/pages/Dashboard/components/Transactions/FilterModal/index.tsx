import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { useFilterModal } from "./useFilterModal";
import { cn } from "../../../../../../app/utils/cn";

interface FilterModalProps {
  open: boolean;
  close(): void;
}

const mock = [
  {
    id: "123",
    name: "Nubank",
  },
  {
    id: "222",
    name: "Inter",
  },
];

export function FilterModal({ close, open }: FilterModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  } = useFilterModal();

  return (
    <Modal title="Filtros" open={open} onclose={close}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Contas
        </span>

        <div className="space-y-2 mt-2">
          {mock.map((bankAccount) => (
            <button
              key={bankAccount.id}
              onClick={() => {
                handleSelectBankAccount(bankAccount.id);
              }}
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                selectedBankAccountId &&
                  selectedBankAccountId == bankAccount.id &&
                  "!bg-gray-200"
              )}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium">{selectedYear}</span>
          </div>

          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
