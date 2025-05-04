import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

// Custom render for components that need a Router
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/country/:code" element={ui} />
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

// Regular render for components that already have Router (like App)
const renderApp = (ui, options) => render(ui, { ...options });

// re-export everything
export * from "@testing-library/react";

// override render methods
export { renderWithRouter, renderApp };
