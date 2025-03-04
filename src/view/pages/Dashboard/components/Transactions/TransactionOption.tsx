import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface TransactionOptionProps {
  isActive: boolean;
  currentMonth: string;
  index: number;
}

export function TransactionOption({
  isActive,
  currentMonth,
  index,
}: TransactionOptionProps) {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        "w-full rounded-full text-sm h-12 text-gray-800 tracking-[-0.5px] font-medium",
        isActive && "bg-white"
      )}
    >
      {currentMonth}
    </button>
  );
}
