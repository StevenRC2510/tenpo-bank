import React, { FC } from 'react';
import { PokemonCardSkeletonProps } from './types';

export const PokemonCardSkeleton: FC<PokemonCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 animate-pulse ${className}`}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-8 h-6 bg-gray-200 rounded-full"></div>
        </div>

        <div className="text-center space-y-2">
          <div className="h-5 bg-gray-200 rounded w-24"></div>

          <div className="flex justify-center space-x-1">
            <div className="h-5 bg-gray-200 rounded w-12"></div>
            <div className="h-5 bg-gray-200 rounded w-12"></div>
          </div>

          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
