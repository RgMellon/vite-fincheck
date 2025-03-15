import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionResponse = Array<Transaction>;

export type TransactionsFilterParam = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction["type"];
};

export async function getAll(params: TransactionsFilterParam) {
  const { data } = await httpClient.get<TransactionResponse>("/transactions", {
    params,
  });
  return data;
}
