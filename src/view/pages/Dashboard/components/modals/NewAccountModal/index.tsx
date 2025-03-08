import { Modal } from "../../../../../components/Modal";
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
      Nova conta
    </Modal>
  );
}
