export interface User {
  id: string | null | undefined;
  email: string;
  username: string;
  role: string;
  createdAt: Date | null | undefined;
}
