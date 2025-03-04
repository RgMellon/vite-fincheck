import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function TransactionSliderNavigation() {
  const swiper = useSwiper();
  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        className="absolute w-12 h-12 left-0 top-1/2 -translate-y-1/2 flex items-center bg-gray-100 z-10"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="absolute  w-12 h-12 right-0 top-1/2 -translate-y-1/2 flex items-center bg-gray-100 z-10"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
}
