export function formateDate(date: Date) {
  return Intl.DateTimeFormat("pt-br").format(date);
}
