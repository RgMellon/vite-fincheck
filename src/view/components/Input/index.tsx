import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, id, error, className, ...props }: InputProps, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          name={name}
          id={id ?? name}
          ref={ref}
          className={cn(
            "bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer  outline-none placeholder-shown:pt-0 focus:border-gray-600",
            error && "!border-red-900",
            className
          )}
          placeholder=" "
        />

        <label
          htmlFor={id ?? name}
          className="absolute left-[13px] top-2 pointer-events-none text-xs
           text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
