import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthToken } from 'features/auth/domain/user.entity';
import { cookieUtils } from 'shared/utils/cookies';

interface AuthContextType {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: AuthToken) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<AuthToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = cookieUtils.getToken();
      if (storedToken) {
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const mockToken: AuthToken = {
          accessToken: storedToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
        };

        setUser(mockUser);
        setToken(mockToken);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User, tokenData: AuthToken) => {
    setUser(userData);
    setToken(tokenData);
    cookieUtils.setToken(tokenData.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    cookieUtils.removeToken();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
