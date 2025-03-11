export function currencyStringToNumber(value: string | number) {
  if (typeof value === "number") {
    return value;
  }

  const sanitaze = value.replace(/\./g, "").replace(",", ".");
  return Number(sanitaze);
}
