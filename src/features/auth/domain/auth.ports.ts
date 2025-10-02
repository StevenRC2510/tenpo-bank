import { UserCredentials, AuthSession } from './user.entity';

export interface AuthRepository {
  login(credentials: UserCredentials): Promise<AuthSession>;
  logout(): Promise<void>;
}

export interface TokenStorage {
  setToken(token: string): void;
  getToken(): string | undefined;
  removeToken(): void;
  hasToken(): boolean;
}
