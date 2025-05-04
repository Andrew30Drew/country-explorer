import React from "react";
import {
  renderWithRouter,
  screen,
  fireEvent,
  waitFor,
} from "../../tests/test-utils";
import Home from "../Home";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "../../services/api";

jest.mock("../../services/api");

describe("Home Page", () => {
  const mockCountries = [
    {
      name: { common: "United States" },
      capital: ["Washington, D.C."],
      population: 331002651,
      region: "Americas",
      flags: { png: "https://flagcdn.com/us.png", alt: "United States flag" },
      cca3: "USA",
    },
    {
      name: { common: "Canada" },
      capital: ["Ottawa"],
      population: 38005238,
      region: "Americas",
      flags: { png: "https://flagcdn.com/ca.png", alt: "Canada flag" },
      cca3: "CAN",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getAllCountries.mockResolvedValue(mockCountries);
    getCountryByName.mockImplementation((name) => {
      const filteredCountries = mockCountries.filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
      return Promise.resolve(filteredCountries);
    });
    getCountriesByRegion.mockImplementation((region) => {
      const filteredCountries = mockCountries.filter(
        (country) => country.region === region
      );
      return Promise.resolve(filteredCountries);
    });
  });

  test("loads and displays countries", async () => {
    renderWithRouter(<Home />);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });
  });

  test("handles search functionality", async () => {
    renderWithRouter(<Home />);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search for a country...");
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "United" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.queryByText("Canada")).not.toBeInTheDocument();
    });
  });

  test("handles region filter", async () => {
    renderWithRouter(<Home />);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Americas" } });

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });
  });
});
