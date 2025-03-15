import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "../../../../../components/Button";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    errors,
    handleSubmit,
    register,
    control,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={isNewTransactionModalOpen}
      onclose={closeNewTransactionModal}
      title={isExpense ? "Nova despesa" : "Nova receita"}
    >
      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="value"
              defaultValue=""
              render={({ field: { onChange, value } }) => {
                return (
                  <InputCurrency
                    value={value}
                    error={errors.value?.message}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Input
              defaultValue=""
              {...register("name")}
              type="text"
              error={errors.name?.message}
              placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
            />

            <Controller
              control={control}
              defaultValue=""
              name="categoryId"
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  error={errors.categoryId?.message}
                  placeholder={"Categoria"}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                />
              )}
            />

            <Controller
              control={control}
              name={"bankAccountId"}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  error={errors.bankAccountId?.message}
                  placeholder={isExpense ? "Pagar com" : "Recebendo com"}
                  options={accounts.map((account) => ({
                    label: account.name,
                    value: account.id,
                  }))}
                />
              )}
            />

            <Controller
              control={control}
              name={"date"}
              defaultValue={new Date()}
              render={({ field: { value, onChange } }) => (
                <DatePickerInput
                  value={value}
                  onChange={onChange}
                  error={errors.date?.message}
                />
              )}
            />
          </div>

          <Button className="mt-10 w-full" isLoading={isLoading}>
            Cadastrar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
