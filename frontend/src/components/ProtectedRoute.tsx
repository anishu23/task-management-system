import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../context/UseAuthenticationHook';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { jwt } = useAuthentication();
  return jwt ? children : <Navigate to='/login' replace />;
}

export default ProtectedRoute;
