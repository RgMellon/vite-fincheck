import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { ColorsDropdownInput } from "../../../../../components/ColorDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    closeEditModalBankAccount,
    isEditModalBankAccountOpen,
    register,
    errors,
    handleSubmit,
    control,
    isDeleteModalOpen,
    handleDeleteModalClose,
    isLoading,
    handleOpenDeleteModal,
    handleDeleteAccount,
    isLoadingRemoveAccount,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoad={isLoadingRemoveAccount}
        onConfirm={handleDeleteAccount}
        subtitle="Tem certeza que deseja excluir?"
        title="Deletar"
        description="Ao excluir a conta, também sera excluido todos os registros de
            receitas e despesas vinculados a ela"
        onClose={handleDeleteModalClose}
      />
    );
  }
  return (
    <Modal
      open={isEditModalBankAccountOpen}
      onclose={closeEditModalBankAccount}
      title="Editar Conta"
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 h-6 w-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>
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
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
