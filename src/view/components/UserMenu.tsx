import { ExitIcon } from "@radix-ui/react-icons";
import { Dropdown } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signOut } = useAuth();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            RM
          </span>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Content className="w-32">
        <Dropdown.Item
          onSelect={() => {
            signOut();
          }}
          className="flex items-center justify-between cursor-pointer"
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
