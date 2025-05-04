import React from "react";
import { renderWithRouter, screen, fireEvent } from "../../tests/test-utils";
import Filter from "../Filter";

describe("Filter Component", () => {
  let mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnFilter = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders filter select with correct options", () => {
    renderWithRouter(<Filter onFilter={mockOnFilter} />);
    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
    expect(screen.getByText("Filter by Region")).toBeInTheDocument();
    expect(screen.getByText("Africa")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Oceania")).toBeInTheDocument();
  });

  test("calls onFilter with selected region", () => {
    renderWithRouter(<Filter onFilter={mockOnFilter} />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "Europe" } });
    expect(mockOnFilter).toHaveBeenCalledWith("Europe");

    fireEvent.change(select, { target: { value: "" } });
    expect(mockOnFilter).toHaveBeenCalledWith("");
  });

  test("has correct styling classes", () => {
    renderWithRouter(<Filter onFilter={mockOnFilter} />);
    const select = screen.getByRole("combobox");

    expect(select).toHaveClass("px-4", "py-2", "rounded", "shadow");
  });
});
