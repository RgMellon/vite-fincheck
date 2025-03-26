import { httpClient } from "../httpClient";

type BankAccountParams = {
  name: string;
  initialBalance: number;
  type: "CHECKING" | "INVESTIMENT" | "CASH";
  color: string;
};

export async function create(params: BankAccountParams) {
  return await httpClient.post("/bank-account", params);
}
