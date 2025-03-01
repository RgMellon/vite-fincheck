import { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";
import { Spiner } from "../Spiner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        `bg-teal-900 hover:bg-teal-800 disabled:bg-transparent 
          px-6 h-12 rounded-2xl
          font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center`,
        className
      )}
    >
      {isLoading ? <Spiner className="w-6 h-6" /> : children}
    </button>
  );
}
