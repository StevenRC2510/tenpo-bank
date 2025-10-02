import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from './index';
import { PokemonCard as PokemonCardType } from 'features/pokemon/domain/pokemon.entity';

const mockPokemon: PokemonCardType = {
  id: 1,
  name: 'Bulbasaur',
  number: '#001',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
};

describe('PokemonCard', () => {
  it('renders pokemon information correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
    expect(screen.getByText('Height: 0.7m')).toBeInTheDocument();
    expect(screen.getByText('Weight: 6.9kg')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('handles keyboard navigation', () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('handles image error', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const image = screen.getByAltText('Bulbasaur');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/placeholder-pokemon.png');
  });

  it('applies custom className', () => {
    render(<PokemonCard pokemon={mockPokemon} className="custom-class" />);

    const card = screen.getByRole('button');
    expect(card).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'View details for Bulbasaur');
  });
});
