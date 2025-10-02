import { PokemonRepository } from 'features/pokemon/domain/pokemon.ports';
import {
  PokemonListData,
  PokemonListResponse,
  PokemonListItem,
  PokemonCard,
} from 'features/pokemon/domain/pokemon.entity';
import { config } from 'shared/config/env';
import axios from 'axios';

export class PokemonRepositoryImpl implements PokemonRepository {
  private readonly baseUrl = config.pokemonApiBaseUrl;

  async getPokemons(
    page: number = 1,
    limit: number = 50,
    search?: string
  ): Promise<PokemonListData> {
    try {
      const offset = (page - 1) * limit;

      let pokemonListResponse: PokemonListResponse;

      if (search) {
        pokemonListResponse = await this.searchPokemons(search, limit, offset);
      } else {
        pokemonListResponse = await this.getPokemonList(limit, offset);
      }

      const pokemonCards = pokemonListResponse.results.map((pokemon, index) =>
        this.transformToBasicPokemonCard(pokemon, offset + index + 1)
      );

      return {
        pokemons: pokemonCards,
        total: pokemonListResponse.count,
        page,
        limit,
        hasNext: !!pokemonListResponse.next,
        hasPrevious: !!pokemonListResponse.previous,
      };
    } catch {
      throw new Error('Failed to fetch Pokémon');
    }
  }

  private async getPokemonList(
    limit: number,
    offset: number
  ): Promise<PokemonListResponse> {
    const response = await axios.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon`,
      {
        params: { limit, offset },
      }
    );
    return response.data;
  }

  private async searchPokemons(
    search: string,
    limit: number,
    offset: number
  ): Promise<PokemonListResponse> {
    const response = await this.getPokemonList(limit * 3, offset);

    const filteredResults = response.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedResults = filteredResults.slice(0, limit);

    return {
      count: filteredResults.length,
      next: filteredResults.length >= limit ? 'has-next' : null,
      previous: offset > 0 ? 'has-previous' : null,
      results: paginatedResults,
    };
  }

  private transformToBasicPokemonCard(
    pokemon: PokemonListItem,
    id: number
  ): PokemonCard {
    return {
      id,
      name: this.capitalizeName(pokemon.name),
      number: `#${id.toString().padStart(3, '0')}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: ['Unknown'],
      height: 100,
      weight: 10,
    };
  }

  private capitalizeName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
