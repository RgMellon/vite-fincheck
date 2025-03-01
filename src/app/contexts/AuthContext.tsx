import { createContext, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
  signedIn: boolean;
  signIn(accessToken: string): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const isSigedIn = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    console.log("executado");
    return !!isSigedIn;
  });

  function signIn(accessToken: string) {
    setSignedIn(true);

    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
  }

  return (
    <AuthContext.Provider value={{ signedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
