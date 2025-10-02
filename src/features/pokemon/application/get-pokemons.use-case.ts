import { PokemonRepository } from 'features/pokemon/domain/pokemon.ports';
import { PokemonListData } from 'features/pokemon/domain/pokemon.entity';

export class GetPokemonsUseCase {
  constructor(readonly pokemonRepository: PokemonRepository) {}

  async execute(
    page: number = 1,
    limit: number = 50,
    search?: string
  ): Promise<PokemonListData> {
    return this.pokemonRepository.getPokemons(page, limit, search);
  }
}
