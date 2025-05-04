import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

describe("Header Component", () => {
  test("renders header with title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Country Explorer")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("header has correct styling classes", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-white", "shadow-md");
  });
});
