import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) =>
  children;
export const Routes = ({ children }: { children: React.ReactNode }) => children;
export const Route = ({ children }: { children: React.ReactNode }) => children;
export const Navigate = ({ to }: { to: string }) =>
  React.createElement('div', { 'data-testid': 'navigate', 'data-to': to });
export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
});
export const useNavigate = () => jest.fn();
export const Link = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => React.createElement('a', { href: to }, children);
