import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginUseCase } from 'features/auth/application/login.use-case';
import { LogoutUseCase } from 'features/auth/application/logout.use-case';
import { UserCredentials, AuthSession } from 'features/auth/domain/user.entity';
import { CookieTokenStorage } from 'features/auth/infrastructure/token-storage';
import { AuthRepositoryImpl } from 'features/auth/infrastructure/auth.repository';

import { useAuth } from 'shared/context/AuthContext';

const authRepository = new AuthRepositoryImpl();
const tokenStorage = new CookieTokenStorage();
const loginUseCase = new LoginUseCase(authRepository, tokenStorage);
const logoutUseCase = new LogoutUseCase(authRepository, tokenStorage);

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: UserCredentials): Promise<AuthSession> =>
      loginUseCase.execute(credentials),
    onSuccess: (session: AuthSession) => {
      login(session.user, session.token);
    },
    onError: error => {
      tokenStorage.removeToken();
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => logoutUseCase.execute(),
    onSuccess: () => queryClient.clear(),
  });
};
