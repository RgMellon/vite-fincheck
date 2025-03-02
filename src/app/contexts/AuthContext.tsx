import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { PageLoader } from "../../view/components/PageLoader";

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

  const { error, isFetching, isSuccess, isError, remove } = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  function signIn(accessToken: string) {
    setSignedIn(true);

    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
  }

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();
    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      signOut();
    }
  }, [error, isError, signOut]);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
