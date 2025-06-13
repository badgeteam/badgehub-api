import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import type React from "react";

// test utils file
const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: MemoryRouter }),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { renderWithRouter as render };
