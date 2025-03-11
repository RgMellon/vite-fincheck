import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { AccountSliderNavigation } from "./AccountSliderNavigation";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../useDashboard";
import { cn } from "../../../../../app/utils/cn";
import { useAccountController } from "./useAccountController";
import { Spiner } from "../../../../components/Spiner";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";

export function Accounts() {
  const windowWidth = useWindowWidth();
  const { areValueVisibility, toggleValueVisibility, openNewAccountModal } =
    useDashboard();
  const { isLoading, accounts, currentBalance } = useAccountController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-8 py-8 flex flex-col ">
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full">
          <Spiner className="text-teal-950/50 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">
              Saldo Total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValueVisibility && "blur-sm"
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                onClick={toggleValueVisibility}
                className="w-8 h-8 flex items-center justify-center"
              >
                <EyeIcon open={areValueVisibility} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4 flex flex-col" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg ">
                    Minhas contas
                  </strong>

                  <button
                    className="mt-4 text-white h-52 flex flex-col gap-4 items-center justify-center rounded-2xl border-2 border-dashed border-teal-600"
                    onClick={openNewAccountModal}
                  >
                    <PlusCircledIcon className="h-6 w-6" />

                    <span className="tracking-[-0.5px] font-medium">
                      Cadastre uma nova conta
                    </span>
                  </button>
                </div>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth.width >= 500 ? 2.1 : 1.1}
                >
                  <div
                    className="flex justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white tracking-[-1px] text-lg ">
                      Minhas contas
                    </strong>

                    <AccountSliderNavigation />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
