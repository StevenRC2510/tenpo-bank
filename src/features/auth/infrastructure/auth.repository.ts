import { AuthRepository } from 'features/auth/domain/auth.ports';
import { UserCredentials, AuthSession } from 'features/auth/domain/user.entity';

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: UserCredentials): Promise<AuthSession> {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockAuthSession: AuthSession = {
          user: {
            id: '1',
            email: credentials.email,
            name: 'Test User',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
          },
          token: {
            accessToken: 'mock-access-token-12345',
            expiresIn: 3600,
            tokenType: 'Bearer',
          },
          isAuthenticated: true,
        };
        resolve(mockAuthSession);
      }, 500);
    });
  }

  async logout(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }
}
