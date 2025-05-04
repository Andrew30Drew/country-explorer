import React from "react";
import { renderWithRouter, screen, waitFor } from "../../tests/test-utils";
import CountryPage from "../CountryPage";
import { getCountryByCode } from "../../services/api";

jest.mock("../../services/api");

describe("CountryPage Component", () => {
  const mockCountry = {
    name: {
      common: "United States",
      nativeName: { eng: { common: "United States" } },
    },
    capital: ["Washington, D.C."],
    population: 331002651,
    region: "Americas",
    subregion: "North America",
    flags: { png: "https://flagcdn.com/us.png", alt: "United States" },
    tld: [".us"],
    currencies: { USD: { name: "United States dollar" } },
    languages: { eng: "English" },
    borders: ["CAN", "MEX"],
  };

  const mockBorderCountries = [
    {
      name: { common: "Canada" },
      cca3: "CAN",
    },
    {
      name: { common: "Mexico" },
      cca3: "MEX",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getCountryByCode.mockImplementation((code) => {
      if (code === "USA") return Promise.resolve([mockCountry]);
      return Promise.resolve([
        mockBorderCountries.find((c) => c.cca3 === code),
      ]);
    });
  });

  test("renders country details", async () => {
    renderWithRouter(<CountryPage />, { route: "/country/USA" });

    await waitFor(() => {
      // Check country name heading
      expect(
        screen.getByRole("heading", { name: "United States" })
      ).toBeInTheDocument();

      // Check population
      const populationText = screen.getByText(/331,002,651/);
      expect(populationText).toBeInTheDocument();

      // Check region
      const regionText = screen.getByText(/Americas/);
      expect(regionText).toBeInTheDocument();

      // Check capital
      const capitalText = screen.getByText(/Washington, D.C./);
      expect(capitalText).toBeInTheDocument();
    });
  });

  test("renders border countries", async () => {
    renderWithRouter(<CountryPage />, { route: "/country/USA" });

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument();
      expect(screen.getByText("Mexico")).toBeInTheDocument();
    });
  });
});
