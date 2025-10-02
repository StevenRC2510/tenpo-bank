import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../routes.definitions';
import { ROUTES } from '../routes.config';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index + 1} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to={ROUTES.POKEMON} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
