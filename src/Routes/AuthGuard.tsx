import { Navigate, Outlet } from "react-router-dom";

type AuthGuardProps = {
  isPrivate: boolean;
};

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const isAuth = false;

  if (isPrivate && !isAuth) {
    return <Navigate to="login" replace />;
  }

  if (!isPrivate && isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
