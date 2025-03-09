import { ColorsDropdownInput } from "../../../../../components/ColorDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } =
    useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      onclose={closeNewAccountModal}
      title="Nova Conta"
    >
      <form>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Input type="text" name="name" placeholder="Nome da conta" />

            <Select
              // error="selecione"
              placeholder="Tipo"
              options={[
                { label: "Investimentos", value: "INVESTMENT" },
                { label: "Dinheiro", value: "CASH" },
                { label: "Conta corrente", value: "CHECKING" },
              ]}
            />

            <ColorsDropdownInput className="w-full" />
          </div>
        </div>
      </form>
    </Modal>
  );
}
