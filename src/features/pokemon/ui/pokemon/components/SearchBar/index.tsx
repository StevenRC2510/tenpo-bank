import React, { FC, useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { SearchBarProps } from './types';

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search Pokémon...',
  className = '',
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
    },
    []
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Search Pokémon"
        />
        {localValue && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
