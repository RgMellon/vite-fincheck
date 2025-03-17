import { httpClient } from "../httpClient";

type TransactionsParam = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
  date: string;
  name: string;
  value: number;
};

export async function update({ id, ...params }: TransactionsParam) {
  console.log(params, "params");
  return await httpClient.put(`/transactions/${id}`, params);
}
