import React from "react";
import { renderWithRouter, screen, fireEvent } from "../../tests/test-utils";
import Search from "../Search";

describe("Search Component", () => {
  let mockOnSearch;

  beforeEach(() => {
    mockOnSearch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    renderWithRouter(<Search onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText("Search for a country...")).toBeInTheDocument();
  });

  test("calls onSearch when form is submitted", () => {
    renderWithRouter(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for a country...");
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "united" } });
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith("united");
  });

  test("has correct styling classes", () => {
    renderWithRouter(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for a country...");

    expect(input).toHaveClass(
      "w-full",
      "md:w-96",
      "px-4",
      "py-2",
      "pl-10",
      "rounded",
      "shadow"
    );
  });
});
