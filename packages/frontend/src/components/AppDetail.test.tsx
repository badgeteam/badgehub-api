import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppDetail from "./AppDetail";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";

describe("AppDetail", () => {
  it("renders app details when found", async () => {
    const app = dummyApps[0]!;
    render(
      <MemoryRouter initialEntries={[`/app/${app.slug}`]}>
        <Routes>
          <Route
            path="/app/:appId"
            element={
              <AppDetail tsRestClient={tsRestClientWithApps(dummyApps)} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    // Wait until the detail page renders
    await waitFor(() =>
      expect(screen.getByTestId("app-detail-page")).toBeInTheDocument()
    );
    expect(screen.getByText(app.name!)).toBeInTheDocument();
    expect(screen.getByText(app.description!)).toBeInTheDocument();
    expect(screen.getByText(app.category!)).toBeInTheDocument();
    if (app.badges && app.badges.length > 0) {
      expect(screen.getByText(app.badges[0]!)).toBeInTheDocument();
    }
    // Revision text is rendered as "Revision: {revision}", so use a flexible matcher
    expect(
      screen.getByText((content) =>
        content.includes(`Revision: ${app.revision ?? "-"}`)
      )
    ).toBeInTheDocument();
  });

  it("shows error if app not found", async () => {
    render(
      <MemoryRouter initialEntries={["/app/999999"]}>
        <Routes>
          <Route
            path="/app/:appId"
            element={
              <AppDetail tsRestClient={tsRestClientWithApps(dummyApps)} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("app-detail-error")).toBeInTheDocument()
    );
  });
});
