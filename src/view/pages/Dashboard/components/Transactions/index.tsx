import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { SwiperSlide, Swiper } from "swiper/react";
import { MONTH } from "../../../../../app/config/constants";
import { TransactionOption } from "./TransactionOption";
import { TransactionSliderNavigation } from "./TransactionSliderNavigation";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { useDashboard } from "../../useDashboard";
import { useTransactionsController } from "./useTransactionsController";
import { Spiner } from "../../../../components/Spiner";
import empty from "../../../../../assets/empty.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FilterModal } from "./FilterModal";
import { formateDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../modals/EditTransactionModal";

export function Transactions() {
  const { areValueVisibility } = useDashboard();
  const {
    isInitialLoading,
    transactions,
    isLoading,
    isFilterModalOpen,
    handleCloseFilterModal,
    handleOpenFilterModal,
    handleChangeFilter,
    filters,
    handleAplyFilters,
    editTransactionModalOpen,
    handleCloseEditTransactionModal,
    handleOpenEditTransactionModal,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100  rounded-2xl w-full h-full md:p-10 px-8 py-8 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spiner />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FilterModal
            open={isFilterModalOpen}
            close={handleCloseFilterModal}
            onAplyFilters={handleAplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                selectedType={filters.type}
                onSelect={handleChangeFilter("type")}
              />

              <button onClick={handleOpenFilterModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                onSlideChange={(swipper) => {
                  handleChangeFilter("month")(swipper.realIndex);
                }}
                initialSlide={filters.month}
              >
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
            {isLoading && (
              <div className="flex items-center justify-center h-full flex-col">
                <Spiner />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex items-center justify-center h-full flex-col">
                <img src={empty} alt="imagem representando lista vazia" />
                <span className="text-gray-700">
                  Não encontramos nenhuma transação
                </span>
              </div>
            )}
            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={editTransactionModalOpen}
                    onClose={handleCloseEditTransactionModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    role="button"
                    onClick={() => {
                      handleOpenEditTransactionModal(transaction);
                    }}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    key={transaction.id}
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <strong className="text-sm font-light text-gray-600 tracking-[-0.5px]">
                          {formateDate(new Date(transaction.date))}
                        </strong>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "tracking-[0.5px] font-medium",
                        !areValueVisibility && "blur-sm",
                        transaction.type === "EXPENSE"
                          ? "text-red-800"
                          : "text-green-800"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}
                      {formatCurrency(Number(transaction.value))}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
