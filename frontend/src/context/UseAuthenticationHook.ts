import { useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

// Hook for consuming context
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
