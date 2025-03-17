import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Button } from "../../../../../components/Button";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({
  open,
  onClose,
  transaction,
}: EditTransactionModalProps) {
  const {
    errors,
    handleSubmit,
    register,
    control,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleCloseDeleteModalOpen,
    isLoadingDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoad={isLoadingDeleteModal}
        onConfirm={handleDeleteTransaction}
        subtitle="Tem certeza que deseja excluir a transação?"
        title="Deletar"
        onClose={handleCloseDeleteModalOpen}
      />
    );
  }

  return (
    <Modal
      open={open}
      onclose={onClose}
      title={isExpense ? "Editar despesa" : "Editar Receita"}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 h-6 w-6" />
        </button>
      }
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
              defaultValue={""}
              {...register("name")}
              type="text"
              error={errors.name?.message}
              placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
            />

            <Controller
              control={control}
              defaultValue={""}
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
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
