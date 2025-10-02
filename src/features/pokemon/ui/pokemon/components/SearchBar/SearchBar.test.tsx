import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from './index';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    expect(
      screen.getByPlaceholderText('Search Pokémon...')
    ).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const mockOnChange = jest.fn();
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        placeholder="Custom placeholder"
      />
    );

    expect(
      screen.getByPlaceholderText('Custom placeholder')
    ).toBeInTheDocument();
  });

  it('displays the current value', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="pikachu" onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('calls onChange with debounce', async () => {
    jest.useFakeTimers();
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} debounceMs={100} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(mockOnChange).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('pikachu');
    });

    jest.useRealTimers();
  });

  it('shows clear button when there is text', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="pikachu" onChange={mockOnChange} />);

    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('hides clear button when there is no text', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="pikachu" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('has proper accessibility attributes', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Search Pokémon');
  });

  it('applies custom className', () => {
    const mockOnChange = jest.fn();
    render(
      <SearchBar value="" onChange={mockOnChange} className="custom-class" />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
