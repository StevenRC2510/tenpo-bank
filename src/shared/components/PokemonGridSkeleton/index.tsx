import { FC } from 'react';
import { PokemonGridSkeletonProps } from './types';

export const PokemonGridSkeleton: FC<PokemonGridSkeletonProps> = ({
  count = 10,
  showHeader = true,
  className = '',
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${className}`}
    >
      <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: count }, (_, index) => (
            <div
              key={`pokemon-skeleton-${index}`}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 animate-pulse"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-inner">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-300 to-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <div className="w-6 h-3 bg-gray-400 rounded"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
