import * as RDXSelect from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";

interface SelectProps {
  error?: string;
  placeholder?: string;
  onChange?(value: string): void;
  value?: string;
  options: {
    label: string;
    value: string;
  }[];
}
export function Select({
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelectValue(value: string) {
    if (onChange) {
      onChange(value);
    }

    setSelectedValue(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute bottom-4 left-3 z-10 text-gray-700 pointer-events-none",
            selectedValue && "text-xs left-[13px] top-2 transition-all"
          )}
        >
          {placeholder}
        </label>

        <RDXSelect.Root value={value} onValueChange={handleSelectValue}>
          <RDXSelect.Trigger
            className={cn(
              `bg-white rounded-lg relative border border-gray-500 px-3 h-[52px] text-gray-800 w-full 
              outline-none placeholder-shown:pt-0 focus:border-gray-600 text-left pt-4`,
              error && "!border-red-900"
            )}
          >
            <RDXSelect.Value />

            <RDXSelect.Icon className="absolute right-3 bottom-3">
              <ChevronDownIcon className="w-6 h-6  text-gray-800" />
            </RDXSelect.Icon>
          </RDXSelect.Trigger>

          <RDXSelect.Portal>
            <RDXSelect.Content className="z-[99] overflow-hidden  bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0, 0.10)]">
              <RDXSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RDXSelect.ScrollUpButton>

              <RDXSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RDXSelect.Item
                    key={option.value}
                    className={
                      "p-2 text-gray-800 outline-none data-[highlighted]:bg-gray-50 rounded-lg"
                    }
                    value={option.value}
                  >
                    <RDXSelect.ItemText>{option.label}</RDXSelect.ItemText>
                  </RDXSelect.Item>
                ))}
              </RDXSelect.Viewport>

              <RDXSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon />
              </RDXSelect.ScrollDownButton>
            </RDXSelect.Content>
          </RDXSelect.Portal>
        </RDXSelect.Root>
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
