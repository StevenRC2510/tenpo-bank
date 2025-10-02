import React, { FC, useCallback } from 'react';
import { PokemonCardProps } from './types';

export const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  className = '',
}) => {
  const handleClick = useCallback(() => {
    onClick?.(pokemon);
  }, [onClick, pokemon]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <button
      type="button"
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-2 w-full text-left transform hover:scale-105 hover:-translate-y-1 ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${pokemon.name}`}
    >
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
                loading="lazy"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-pokemon.png';
                }}
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {pokemon.number}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {pokemon.name}
            </h3>

            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {pokemon.types.map(type => (
                <span
                  key={type}
                  className={`px-3 py-1 text-xs font-semibold rounded-full text-white shadow-sm ${getTypeColor(type)}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>

            {pokemon.height > 0 && pokemon.weight > 0 && (
              <div className="text-xs text-gray-500 space-y-1">
                <div>Height: {pokemon.height / 10}m</div>
                <div>Weight: {pokemon.weight / 10}kg</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
    unknown: 'bg-gray-300',
  };

  return typeColors[type.toLowerCase()] || 'bg-gray-500';
};
