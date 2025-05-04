import React from "react";
import { renderWithRouter, screen } from "../../tests/test-utils";
import CountryCard from "../CountryCard";

describe("CountryCard Component", () => {
  const mockCountry = {
    name: { common: "United States" },
    capital: ["Washington, D.C."],
    population: 331002651,
    flags: {
      png: "https://example.com/flag.png",
      alt: "United States flag",
    },
    region: "Americas",
  };

  test("renders country information correctly", () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Washington, D.C.")).toBeInTheDocument();
    expect(screen.getByText("331,002,651")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
  });

  test("renders country flag with correct alt text", () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    const flagImage = screen.getByRole("img");
    expect(flagImage).toHaveAttribute("src", mockCountry.flags.png);
    expect(flagImage).toHaveAttribute("alt", mockCountry.flags.alt);
  });

  test("card has correct styling classes", () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    const card = screen.getByRole("link");
    expect(card).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "overflow-hidden",
      "hover:shadow-lg",
      "transition-shadow"
    );
  });
});
