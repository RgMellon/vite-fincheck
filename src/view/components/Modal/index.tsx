import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  rightAction?: React.ReactNode;
  onclose(): void;
}

export function Modal({
  children,
  open,
  title,
  rightAction,
  onclose,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onclose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/8 backdrop-blur-sm z-50" />

        <Dialog.Content className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] p-6 space-y-10 bg-white rounded-2xl z-[51]">
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button className="w-12 h-12" onClick={onclose}>
              <Cross1Icon className="w-6 h-6 " />
            </button>

            <span className="text-lg tracking-[-1px] font-bold">{title}</span>

            <div className="w-12 h-12 flex items-center justify-center ">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
