import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import CharacterCard from '../components/characterCard'; 
import theme from "../theme";
import { useSpecies } from '../services/queryService';

// Mock the useSpecies hook
jest.mock('../services/queryService', () => ({
  useSpecies: jest.fn(),
}));


//mock the Loader component
jest.mock('../components/loader', () => () => <div data-testid="loader">Loading...</div>);

describe('CharacterCard Component', () => {

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  const mockCharacter = {
    name: 'Luke Skywalker',
    species: ['https://swapi.dev/api/species/1/'],
  };

  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('should render loader while species data is being fetched', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should display an error message when fetching species data fails', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const errorMessage = screen.getByText(/Error fetching species data/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render the character name correctly when data is loaded', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: { classification: 'mammal' },
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const characterName = screen.getByText(/Luke Skywalker/i);
    expect(characterName).toBeInTheDocument();
  });

  it('should render the character image correctly when data is loaded', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: { classification: 'mammal' },
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const characterImage = screen.getByAltText(/Luke Skywalker/);
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute(
      'src',
      `https://picsum.photos/seed/${encodeURIComponent('Luke Skywalker')}/200`
    );
  });

  it('should call onClick handler when the card is clicked', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: { classification: 'mammal' },
      isLoading: false,
      error: null,
    });

    const handleClick = jest.fn();
    renderWithTheme(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply correct species color based on fetched classification', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: { classification: 'sentient' },
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle('background-color: #5D4037'); // Dark Brown color for sentient species
  });

  it('should apply default color when species data is not available', () => {
    (useSpecies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle('background-color: #000000'); // Default black color
  });
});
