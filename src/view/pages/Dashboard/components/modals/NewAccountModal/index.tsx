import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { ColorsDropdownInput } from "../../../../../components/ColorDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  } = useNewAccountModalController();

  return (
    <Modal
      open={isNewAccountModalOpen}
      onclose={closeNewAccountModal}
      title="Nova Conta"
    >
      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => {
                return (
                  <InputCurrency
                    value={value}
                    error={errors.initialBalance?.message}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Input
              type="text"
              error={errors.name?.message}
              {...register("name")}
              placeholder="Nome da conta"
            />

            <Controller
              control={control}
              name="type"
              defaultValue="CASH"
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  error={errors.type?.message}
                  placeholder="Tipo"
                  options={[
                    { label: "Investimentos", value: "INVESTIMENT" },
                    { label: "Dinheiro", value: "CASH" },
                    { label: "Conta corrente", value: "CHECKING" },
                  ]}
                />
              )}
            />

            <Controller
              control={control}
              name="color"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <ColorsDropdownInput
                  onChange={onChange}
                  value={value}
                  error={errors.color?.message}
                  className="w-full"
                />
              )}
            />

            <Button className="mt-4" isLoading={isLoading}>
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
