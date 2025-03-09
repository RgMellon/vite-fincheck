import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      defaultValue={"0"}
      className="w-full text-3xl text-gray-800 font-bold tracking-[-1px] outline-none"
    />
  );
}
