import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

type AuthGuardProps = {
  isPrivate: boolean;
};

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (isPrivate && !signedIn) {
    return <Navigate to="login" replace />;
  }

  if (!isPrivate && signedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
