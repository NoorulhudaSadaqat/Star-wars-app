import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CharacterModal from "../components/characterModal";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import theme from "../theme";
import * as queryService from "../services/queryService";

// Mock the useHomeworld hook
jest.mock("../services/queryService", () => ({
  useHomeworld: jest.fn(),
}));

const mockCharacter = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  birth_year: "19BBY",
  films: ["A New Hope"],
  homeworld: "https://swapi.dev/api/planets/1/",
  created: "2014-12-09T13:50:51.644000Z",
};

// Mock close handler
const mockOnClose = jest.fn();

const mockHomeworldData = {
  name: "Tatooine",
  terrain: "desert",
  climate: "arid",
  population: "200000",
};

const queryClient = new QueryClient();

describe("CharacterModal Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    );
  };

  it("should render character details correctly", () => {
    (queryService.useHomeworld as jest.Mock).mockReturnValue({
      data: mockHomeworldData,
      isLoading: false,
    });

    renderWithProviders(
      <CharacterModal character={mockCharacter} onClose={mockOnClose} />
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it("should call onClose handler when the close button is clicked", () => {
    (queryService.useHomeworld as jest.Mock).mockReturnValue({
      data: mockHomeworldData,
      isLoading: false,
    });

    renderWithProviders(
      <CharacterModal character={mockCharacter} onClose={mockOnClose} />
    );
    const closeButton = screen.getByText("×");
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should show loader while fetching homeworld data", async () => {
    (queryService.useHomeworld as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderWithProviders(
      <CharacterModal character={mockCharacter} onClose={mockOnClose} />
    );

    // Wait for the loader to appear
    await waitFor(() =>
      expect(screen.getByTestId("loader")).toBeInTheDocument()
    );
  });

  it("should display homeworld details correctly when data is loaded", async () => {
    (queryService.useHomeworld as jest.Mock).mockReturnValue({
      data: mockHomeworldData,
      isLoading: false,
    });

    renderWithProviders(
      <CharacterModal character={mockCharacter} onClose={mockOnClose} />
    );

    // Wait for the loader to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    // Now check for the homeworld details
    expect(await screen.findByText(/Homeworld Details/)).toBeInTheDocument();
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
  });
});
