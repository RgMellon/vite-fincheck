import * as RdxDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

const DropdownMenuRoot = ({ children }: { children: React.ReactNode }) => {
  return <RdxDropdown.Root>{children}</RdxDropdown.Root>;
};

const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <RdxDropdown.Trigger className="outline-none">
      {children}
    </RdxDropdown.Trigger>
  );
};

const DropdownMenuContent = ({ children, className }: DropdownMenuProps) => {
  return (
    <RdxDropdown.Portal>
      <RdxDropdown.Content
        className={cn(
          "rounded-2xl z-50 p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          className
        )}
      >
        {children}
      </RdxDropdown.Content>
    </RdxDropdown.Portal>
  );
};

const DropdownMenuItem = ({
  children,
  className,
  onSelect,
}: DropdownMenuProps) => {
  return (
    <RdxDropdown.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[40px] cursor-pointer rounded-2xl outline-none flex items-center py-2 px-4 text-sm text-gray-800 hover:bg-gray-50",
        className
      )}
    >
      {children}
    </RdxDropdown.Item>
  );
};

export const Dropdown = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
