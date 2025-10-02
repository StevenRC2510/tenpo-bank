import { cookieUtils } from 'shared/utils/cookies';
import { TokenStorage } from 'features/auth/domain/auth.ports';

export class CookieTokenStorage implements TokenStorage {
  setToken(token: string): void {
    cookieUtils.setToken(token);
  }

  getToken(): string | undefined {
    return cookieUtils.getToken();
  }

  removeToken(): void {
    cookieUtils.removeToken();
  }

  hasToken(): boolean {
    return cookieUtils.hasToken();
  }
}
