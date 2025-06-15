import userEvent from "@testing-library/user-event";
import React from "react";
import { SessionContext } from "@components/keycloakSession/SessionContext.tsx";
import Keycloak from "keycloak-js";
import { vitest } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const TestSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = {
    user: {
      name: "Test User",
      email: "",
      id: "test-user-id",
      token: "test-token",
    },
    keycloak: {
      authenticated: true,
      login: vitest.fn() as unknown,
      logout: vitest.fn() as unknown,
      updateToken: vitest.fn().mockResolvedValue(true) as unknown,
    } as Keycloak,
  };
  return <SessionContext value={session}> {children}</SessionContext>;
};

const RouterAndSession: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MemoryRouter>
      <TestSessionProvider>{children};</TestSessionProvider>
    </MemoryRouter>
  );
};

const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: RouterAndSession }),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { renderWithRouter as render };
