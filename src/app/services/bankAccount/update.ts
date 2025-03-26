import { httpClient } from "../httpClient";

type UpdateBankAccountParams = {
  name: string;
  id: string;
  initialBalance: number;
  type: "CHECKING" | "INVESTIMENT" | "CASH";
  color: string;
};

export async function update({ id, ...params }: UpdateBankAccountParams) {
  return await httpClient.put(`/bank-account/${id}`, params);
}
