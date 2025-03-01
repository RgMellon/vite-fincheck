import { httpClient } from "../httpClient";

type SignInParams = {
  email: string;
  password: string;
};

type SignInResponse = {
  accesToken: string;
};

export async function signIn(params: SignInParams) {
  return await httpClient.post<SignInResponse>("/auth/signin", params);
}
