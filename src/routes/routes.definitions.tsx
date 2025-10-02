import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute, PublicRoute, PokemonGridSkeleton } from 'shared';
import { ROUTES } from './routes.config';

const Login = lazy(() =>
  import('features/auth').then(module => ({ default: module.Login }))
);
const PokemonList = lazy(() =>
  import('features/pokemon').then(module => ({ default: module.PokemonList }))
);

const RouteLoader = () => <PokemonGridSkeleton count={10} showHeader={true} />;

export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <Suspense fallback={<RouteLoader />}>
          <Login />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.POKEMON,
    element: (
      <ProtectedRoute>
        <Suspense fallback={<RouteLoader />}>
          <PokemonList />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];
