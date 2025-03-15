import { httpClient } from "../httpClient";

type TransactionsParam = {
  bankAccountId: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
  date: string;
  name: string;
  value: number;
};

export async function create(params: TransactionsParam) {
  return await httpClient.post("/transactions", params);
}
