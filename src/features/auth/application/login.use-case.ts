import { UserCredentials, AuthSession } from 'features/auth/domain/user.entity';
import { AuthRepository, TokenStorage } from 'features/auth/domain/auth.ports';

export class LoginUseCase {
  constructor(
    readonly authRepository: AuthRepository,
    readonly tokenStorage: TokenStorage
  ) {}

  async execute(credentials: UserCredentials): Promise<AuthSession> {
    const session = await this.authRepository.login(credentials);
    this.tokenStorage.setToken(session.token.accessToken);
    return session;
  }
}
