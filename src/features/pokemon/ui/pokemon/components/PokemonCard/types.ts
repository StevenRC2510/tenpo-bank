import { PokemonCard as PokemonCardEntity } from 'features/pokemon/domain/pokemon.entity';

export interface PokemonCardProps {
  pokemon: PokemonCardEntity;
  onClick?: (pokemon: PokemonCardEntity) => void;
  className?: string;
}
