import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from 'shared';
import { SkeletonList } from 'shared/components/Skeleton';
import { ROUTES } from './routes.config';

const Login = lazy(() =>
  import('features/auth').then(module => ({ default: module.Login }))
);
const PokemonList = lazy(() =>
  import('features/pokemon').then(module => ({ default: module.PokemonList }))
);

const RouteLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="w-full max-w-4xl p-4">
      <SkeletonList items={3} />
    </div>
  </div>
);

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
