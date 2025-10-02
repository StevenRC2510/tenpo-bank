export const ROUTES = {
  LOGIN: '/login',
  POKEMON: '/',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
