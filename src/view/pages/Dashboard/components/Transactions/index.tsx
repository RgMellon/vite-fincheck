import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { SwiperSlide, Swiper } from "swiper/react";
import { MONTH } from "../../../../../app/config/constants";
import { TransactionOption } from "./TransactionOption";
import { TransactionSliderNavigation } from "./TransactionSliderNavigation";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { useDashboard } from "../../useDashboard";

export function Transactions() {
  const { areValueVisibility } = useDashboard();
  return (
    <div className="bg-gray-100  rounded-2xl w-full h-full md:p-10 px-8 py-8 flex flex-col">
      <header>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-grape-800 tracking-[-0.5px] font-medium ">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-800" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper slidesPerView={3} centeredSlides>
            <TransactionSliderNavigation />
            {MONTH.map((currentMonth, index) => (
              <SwiperSlide key={currentMonth}>
                {({ isActive }) => (
                  <TransactionOption
                    index={index}
                    currentMonth={currentMonth}
                    isActive={isActive}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 ">
          <div className="flex flex-1 items-center gap-3">
            <CategoryIcon type="expense" />

            <div>
              <strong className="font-bold tracking-[-0.5px] block">
                Almoço
              </strong>
              <strong className="text-sm font-light text-gray-600 tracking-[-0.5px]">
                11/02/2020
              </strong>
            </div>
          </div>

          <span
            className={cn(
              "text-red-800 tracking-[0.5px] font-medium",
              !areValueVisibility && "blur-sm"
            )}
          >
            - {formatCurrency(123)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 ">
          <div className="flex flex-1 items-center gap-3">
            <CategoryIcon type="expense" />

            <div>
              <strong className="font-bold tracking-[-0.5px] block">
                Almoço
              </strong>
              <strong className="text-sm font-light text-gray-600 tracking-[-0.5px]">
                11/02/2020
              </strong>
            </div>
          </div>

          <span className="text-red-800 tracking-[0.5px] font-medium">
            - {formatCurrency(123)}
          </span>
        </div>
      </div>
    </div>
  );
}
