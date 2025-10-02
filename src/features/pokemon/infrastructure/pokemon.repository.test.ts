import axios from 'axios';
import { PokemonRepositoryImpl } from './pokemon.repository';

// Mock axios module
jest.mock('axios', () => ({
  get: jest.fn(),
  isAxiosError: jest.fn(),
}));
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonRepositoryImpl', () => {
  let repository: PokemonRepositoryImpl;

  beforeEach(() => {
    repository = new PokemonRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getPokemons', () => {
    it('should handle network errors', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(repository.getPokemons(1, 20)).rejects.toThrow(
        'Failed to fetch Pokémon'
      );
    });

    it('should handle API errors', async () => {
      const mockError = {
        response: {
          data: { message: 'API Error' },
        },
        isAxiosError: true,
        code: 'API_ERROR',
        message: 'API Error',
      };

      mockAxios.get.mockRejectedValueOnce(mockError);
      mockAxios.isAxiosError.mockReturnValue(true);

      await expect(repository.getPokemons(1, 20)).rejects.toThrow(
        'Failed to fetch Pokémon'
      );
    });

    it('should handle unexpected errors', async () => {
      mockAxios.get.mockRejectedValueOnce('Unexpected error');
      mockAxios.isAxiosError.mockReturnValue(false);

      await expect(repository.getPokemons(1, 20)).rejects.toThrow(
        'Failed to fetch Pokémon'
      );
    });
  });
});
