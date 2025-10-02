import { AuthRepository, TokenStorage } from 'features/auth/domain/auth.ports';

export class LogoutUseCase {
  constructor(
    readonly authRepository: AuthRepository,
    readonly tokenStorage: TokenStorage
  ) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
    this.tokenStorage.removeToken();
  }
}
