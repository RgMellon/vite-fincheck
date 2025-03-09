import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={isNewTransactionModalOpen}
      onclose={closeNewTransactionModal}
      title={isExpense ? "Nova despesa" : "Nova receita"}
    >
      <form>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
            />

            <Select
              // error="selecione"
              placeholder={"Categoria"}
              options={[
                { label: "Investimentos", value: "INVESTMENT" },
                { label: "Dinheiro", value: "CASH" },
                { label: "Conta corrente", value: "CHECKING" },
              ]}
            />

            <Select
              // error="selecione"
              placeholder={isExpense ? "Pagar com" : "Recebendo com"}
              options={[
                { label: "Investimentos", value: "INVESTMENT" },
                { label: "Dinheiro", value: "CASH" },
                { label: "Conta corrente", value: "CHECKING" },
              ]}
            />

            <DatePickerInput />
          </div>
        </div>
      </form>
    </Modal>
  );
}
