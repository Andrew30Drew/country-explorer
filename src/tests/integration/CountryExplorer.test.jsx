import React from "react";
import { renderApp, screen, fireEvent, waitFor } from "../test-utils";
import App from "../../App";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "../../services/api";

jest.mock("../../services/api");

describe("Country Explorer Integration Tests", () => {
  const mockCountries = [
    {
      name: { common: "United States" },
      capital: ["Washington, D.C."],
      population: 331002651,
      region: "Americas",
      flags: { png: "us-flag.png", alt: "US Flag" },
      cca3: "USA",
    },
    {
      name: { common: "France" },
      capital: ["Paris"],
      population: 67391582,
      region: "Europe",
      flags: { png: "france-flag.png", alt: "France Flag" },
      cca3: "FRA",
    },
    {
      name: { common: "Japan" },
      capital: ["Tokyo"],
      population: 125836021,
      region: "Asia",
      flags: { png: "japan-flag.png", alt: "Japan Flag" },
      cca3: "JPN",
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

  test("search functionality filters countries", async () => {
    renderApp(<App />);

    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    const searchForm = searchInput.closest("form");

    fireEvent.change(searchInput, { target: { value: "france" } });
    fireEvent.submit(searchForm);

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.queryByText("United States")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  test("region filter shows only countries from selected region", async () => {
    renderApp(<App />);

    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });

    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "Europe" } });

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.queryByText("United States")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  test("search and filter combination works correctly", async () => {
    renderApp(<App />);

    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    const searchForm = searchInput.closest("form");
    const filterSelect = screen.getByRole("combobox");

    fireEvent.change(filterSelect, { target: { value: "Americas" } });

    // Wait for region filter results
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: "united" } });
    fireEvent.submit(searchForm);

    // Wait for combined search and filter results
    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });
});
