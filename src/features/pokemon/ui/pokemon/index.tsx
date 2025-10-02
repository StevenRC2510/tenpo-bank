import { FC, useState, useMemo, useCallback } from 'react';
import { Zap, Frown, Search, RotateCcw } from 'lucide-react';
import { useAuth, useTranslation, useToast } from 'shared';
import { useLogout } from 'features/auth/infrastructure/auth.queries';
import { usePokemons } from 'features/pokemon/infrastructure/pokemon.queries';
import {
  PokemonCard,
  SearchBar,
  Pagination,
  PokemonCardSkeleton,
} from './components';

export const PokemonList: FC = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const logoutMutation = useLogout();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: pokemonData,
    isLoading,
    error,
  } = usePokemons(currentPage, pageSize, searchTerm);

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
        showSuccess('Logged out successfully');
      },
      onError: () => {
        showError('Failed to logout');
      },
    });
  }, [logoutMutation, logout, showSuccess, showError]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  }, []);

  const totalPages = useMemo(() => {
    return pokemonData ? Math.ceil(pokemonData.total / pageSize) : 0;
  }, [pokemonData, pageSize]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-white/60 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {t('pokemon.welcome', { name: user?.name || 'Trainer' })}
                </span>
              </div>
              <span className="sm:hidden text-sm text-gray-700 truncate max-w-20 font-medium">
                {user?.name?.split(' ')[0] || 'Trainer'}
              </span>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {logoutMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing out...</span>
                  </div>
                ) : (
                  t('pokemon.logout')
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t('pokemon.title')}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-auto sm:max-w-md">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={t('pokemon.searchPlaceholder')}
                className="w-full"
              />
            </div>
            {pokemonData && (
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <span className="text-sm font-medium text-gray-600">
                  {t('pokemon.totalPokemon', { count: pokemonData.total })}
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('pokemon.loading')}
              </h3>
              <p className="text-gray-500 mb-8">
                {t('pokemon.loadingDescription')}
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6"
                aria-label="Loading Pokémon"
              >
                {Array.from({ length: pageSize }).map((_, index) => (
                  <PokemonCardSkeleton key={`skeleton-${index + 1}`} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6 shadow-lg">
                <Frown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('pokemon.error')}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {error instanceof Error
                  ? error.message
                  : t('pokemon.errorGeneric')}
              </p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-black via-gray-800 to-white hover:from-gray-900 hover:via-black hover:to-gray-100 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <RotateCcw className="mr-2 w-4 h-4" />
                {t('pokemon.retry')}
              </button>
            </div>
          )}

          {pokemonData && !isLoading && !error && (
            <>
              {pokemonData.pokemons.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mb-6 shadow-lg">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {t('pokemon.noResults')}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? t('pokemon.noResultsWithTerm', { term: searchTerm })
                      : t('pokemon.noResultsGeneric')}
                  </p>
                </div>
              ) : (
                <>
                  <section aria-label="Pokémon collection">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                      {pokemonData.pokemons.map(pokemon => (
                        <PokemonCard
                          key={pokemon.id}
                          pokemon={pokemon}
                          onClick={() => null}
                        />
                      ))}
                    </div>
                  </section>

                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      pageSize={pageSize}
                      onPageSizeChange={handlePageSizeChange}
                      totalItems={pokemonData.total}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
