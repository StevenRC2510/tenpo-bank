export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthSession {
  user: User;
  token: AuthToken;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: AuthToken;
  user: User;
  message?: string;
}
