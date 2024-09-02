import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Loader from "../components/loader";
import theme from "../theme";

describe("Loader Component", () => {

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  // Helper function to wrap the component with the theme provider
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("should render the loader", () => {
    renderWithTheme(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("should display a loading animation", () => {
    renderWithTheme(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader.firstChild).toHaveStyle(
      "animation: cilQsd 1.2s linear infinite"
    );
  });
});
