import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  expires: 7,
};

export const cookieUtils = {
  setToken: (token: string): void => {
    Cookies.set('accessToken', token, COOKIE_OPTIONS);
  },

  getToken: (): string | undefined => {
    return Cookies.get('accessToken');
  },

  removeToken: (): void => {
    Cookies.remove('accessToken');
  },

  hasToken: (): boolean => {
    return !!Cookies.get('accessToken');
  },
};
