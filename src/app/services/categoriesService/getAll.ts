import { Categories } from "../../entities/Categories";
import { httpClient } from "../httpClient";

type CategoriesResponse = Array<Categories>;

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");
  return data;
}
