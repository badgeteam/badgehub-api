import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import {
  tsRestClientWithApps,
  tsRestClientWithError,
  tsRestClientWithEmptyList,
} from "@__test__/tsRestClientBuilder.ts";
import { dummyApps } from "@__test__/fixtures/dummyApps.ts";

describe("App", () => {
  it("renders the homepage with dummy apps", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
    expect(screen.getByText(/Share\. Build\. Innovate\./i)).toBeInTheDocument();
    await waitFor(() => {
      const appCardElements = screen.getAllByTestId("AppCard");
      expect(appCardElements.length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(/Browse Apps/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/BadgeHub. All rights reserved./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("filter-dropdown-mcu")).toBeInTheDocument();
    expect(screen.getByTestId("filter-dropdown-category")).toBeInTheDocument();
    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("app-cards-container")).toBeInTheDocument();
  });

  it("shows the filter bar", () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    render(<App tsRestClient={tsRestClientWithError()} />);
    expect(
      await screen.findByText(/Failed to fetch projects/i)
    ).toBeInTheDocument();
  });

  it("shows a message or empty state when there are no apps", async () => {
    render(<App tsRestClient={tsRestClientWithEmptyList()} />);
    expect(screen.queryByTestId("app-cards-container")).not.toBeInTheDocument();
    expect(await screen.findByText(/No apps found\./i)).toBeInTheDocument();
  });
});
