import * as RdxPopOver from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

interface PopOverContentProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

const PopOverRoot = ({ children }: { children: React.ReactNode }) => {
  return <RdxPopOver.Root>{children}</RdxPopOver.Root>;
};

const PopOverTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  return (
    <RdxPopOver.Trigger className="outline-none w-full" asChild={asChild}>
      {children}
    </RdxPopOver.Trigger>
  );
};

const PopOverContent = ({ children, className }: PopOverContentProps) => {
  return (
    <RdxPopOver.Portal>
      <RdxPopOver.Content
        className={cn(
          "rounded-2xl z-50 p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          className
        )}
      >
        {children}
      </RdxPopOver.Content>
    </RdxPopOver.Portal>
  );
};

export const PopOver = {
  Root: PopOverRoot,
  Trigger: PopOverTrigger,
  Content: PopOverContent,
};
