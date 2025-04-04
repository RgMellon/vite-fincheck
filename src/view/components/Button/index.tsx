import { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";
import { Spiner } from "../Spiner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  disabled,
  isLoading,
  children,
  variant,
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
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/10",
        className
      )}
    >
      {isLoading ? <Spiner className="w-6 h-6" /> : children}
    </button>
  );
}
