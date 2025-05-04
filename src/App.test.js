import React from "react";
import { renderApp, screen } from "./tests/test-utils";
import App from "./App";

test("renders app header", () => {
  renderApp(<App />);
  const headerElement = screen.getByText(/Country Explorer/i);
  expect(headerElement).toBeInTheDocument();
});
