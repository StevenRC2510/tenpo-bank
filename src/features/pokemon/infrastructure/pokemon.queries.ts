import { useQuery } from '@tanstack/react-query';
import { GetPokemonsUseCase } from 'features/pokemon/application/get-pokemons.use-case';
import { PokemonRepositoryImpl } from './pokemon.repository';
import { PokemonListData } from 'features/pokemon/domain/pokemon.entity';

const pokemonRepository = new PokemonRepositoryImpl();
const getPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);

export const usePokemons = (
  page: number = 1,
  limit: number = 50,
  search?: string
) => {
  return useQuery<PokemonListData>({
    queryKey: ['pokemons', page, limit, search],
    queryFn: () => getPokemonsUseCase.execute(page, limit, search),
  });
};
