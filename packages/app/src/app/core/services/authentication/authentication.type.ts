export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  accountId: string;
  token: string;
}
