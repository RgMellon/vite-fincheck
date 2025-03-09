import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formateDate } from "../../app/utils/formatDate";
import { PopOver } from "./PopOver";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate] = useState(new Date());

  return (
    <div>
      <PopOver.Root>
        <PopOver.Trigger>
          <button
            type="button"
            className={cn(
              "w-full bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700  transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
          >
            <span className="absolute text-gray-700 top-2 text-xs left-13px pointer-events-none">
              Data
            </span>

            <span>{formateDate(selectedDate)}</span>
          </button>
        </PopOver.Trigger>

        <PopOver.Content className="z-99">
          <DatePicker value={selectedDate} onChange={() => {}} />
        </PopOver.Content>
      </PopOver.Root>

      {error && (
        <div className="mt-2 flex gap-2 items-center text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
