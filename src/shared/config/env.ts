export const config = {
  pokemonApiBaseUrl:
    process.env.REACT_APP_POKEMON_API_BASE_URL || 'https://pokeapi.co/api/v2',

  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

export type configEnvs = typeof config;
