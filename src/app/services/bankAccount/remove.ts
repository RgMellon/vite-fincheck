import { httpClient } from "../httpClient";

export async function remove(id: string) {
  await httpClient.delete(`/bank-account/${id}`);
}
