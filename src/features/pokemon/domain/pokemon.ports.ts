import { PokemonListData } from './pokemon.entity';

export interface PokemonRepository {
  getPokemons(
    page?: number,
    limit?: number,
    search?: string
  ): Promise<PokemonListData>;
}
