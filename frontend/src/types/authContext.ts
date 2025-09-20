import type { User } from './user';

export interface AuthContextType {
  user: string | null;
  userId: string | null;
  jwt: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: User, password: string) => Promise<void>;
}
