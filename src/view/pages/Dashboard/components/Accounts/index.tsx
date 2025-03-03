import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { AccountSliderNavigation } from "./AccountSliderNavigation";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export function Accounts() {
  const windowWidth = useWindowWidth();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-8 py-8 flex flex-col ">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo Total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth.width >= 500 ? 2.1 : 1.1}
          >
            <div className="flex justify-between mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg ">
                Minhas contas
              </strong>

              <AccountSliderNavigation />
            </div>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                type="CHECKING"
                balance={123.02}
                color="#7950f2"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                type="CHECKING"
                balance={123.02}
                color="#7950f2"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                type="CHECKING"
                balance={123.02}
                color="#7950f2"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
