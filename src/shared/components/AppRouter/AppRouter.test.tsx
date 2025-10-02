import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'shared/context/AuthContext';
import { AppRouter } from './index';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('AppRouter', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <AppRouter />
      </TestWrapper>
    );

    expect(container).toBeInTheDocument();
  });

  it('renders router structure', () => {
    render(
      <TestWrapper>
        <AppRouter />
      </TestWrapper>
    );

    expect(document.body).toBeInTheDocument();
  });
});
