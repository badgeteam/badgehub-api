import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@__test__";
import HomePage from "./HomePage.tsx";
import { tsRestClientWithApps, tsRestClientWithError } from "@__test__";
import { dummyApps } from "@__test__";

describe("HomePage", () => {
  it("renders the homepage with dummy apps", async () => {
    render(<HomePage tsRestClient={tsRestClientWithApps(dummyApps)} />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
    expect(screen.getByText(/Share\. Build\. Innovate\./i)).toBeInTheDocument();
    await waitFor(() => {
      const appCardElements = screen.getAllByTestId("AppCard");
      expect(appCardElements.length).toBeGreaterThan(0);
    });
    expect(
      screen.getByTestId("Header/Link/BrowseProjects")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/BadgeHub. All rights reserved./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("badge-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("app-cards-container")).toBeInTheDocument();
  });

  it("shows the filter bar", () => {
    render(<HomePage tsRestClient={tsRestClientWithApps(dummyApps)} />);
    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    render(<HomePage tsRestClient={tsRestClientWithError()} />);
    expect(
      await screen.findByText(/Failed to fetch projects.*/i)
    ).toBeInTheDocument();
  });

  it("shows a message or empty state when there are no apps", async () => {
    render(<HomePage tsRestClient={tsRestClientWithApps([])} />);
    expect(screen.queryByTestId("app-cards-container")).not.toBeInTheDocument();
    expect(await screen.findByText(/No apps found\./i)).toBeInTheDocument();
  });
});
