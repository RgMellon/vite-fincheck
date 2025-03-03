import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountSliderNavigation() {
  const swipper = useSwiper();

  return (
    <div>
      <button
        onClick={() => swipper.slidePrev()}
        className="
        cursor-pointer 
        py-3 pl-2.5 pr-3.5 
        rounded-full
        disabled:opacity-40 
        enabled:hover:bg-black/10"
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        onClick={() => swipper.slideNext()}
        className="
        cursor-pointer 
        py-3 pl-2.5 pr-3.5 
        rounded-full
        disabled:opacity-40 
        enabled:hover:bg-black/10"
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
