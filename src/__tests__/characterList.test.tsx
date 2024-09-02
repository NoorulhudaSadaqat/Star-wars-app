import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import HomePage from "../pages/characterList";
import { useCharacters, useSpecies } from "../services/queryService";
import theme from "../theme";

// Mock the `useCharacters` hook
jest.mock("../services/queryService", () => ({
  useCharacters: jest.fn(),
  useSpecies: jest.fn(),
}));

jest.mock("axios");

describe("HomePage Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  // Helper function to wrap the component with the theme provider
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("should render character grid", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            name: "Luke Skywalker",
            species: ["https://swapi.dev/api/species/1/"],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    (useSpecies as jest.Mock).mockReturnValue({
      data: { classification: "mammal" },
      isLoading: false,
      isError: false,
    });

    renderWithTheme(<HomePage />);
    const characterGrid = screen.getByTestId("character-grid");
    expect(characterGrid).toBeInTheDocument();
  });

  it("should show loader while loading characters", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    renderWithTheme(<HomePage />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
});
