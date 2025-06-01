import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { tsRestClient as defaultTsRestClient } from "@api/tsRestClient.ts";

// Basic smoke test for App rendering

describe("App", () => {
  it("renders the homepage without crashing", async () => {
    render(<App />);
    // Check for main page container
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
    // Check for hero headline
    expect(screen.getByText(/Share\. Build\. Innovate\./i)).toBeInTheDocument();
    // Check for at least one featured app card
    await waitFor(() => {
      const appCardElements = screen.getAllByTestId("AppCard");
      expect(appCardElements.length).toBeGreaterThan(0);
    });
    // Check for navigation (desktop or mobile)
    expect(screen.getAllByText(/Browse Apps/i).length).toBeGreaterThan(0);
    // Check for footer
    expect(
      screen.getByText(/BadgeHub. All rights reserved./i)
    ).toBeInTheDocument();
    // Check for filters
    expect(screen.getByTestId("filter-dropdown-mcu")).toBeInTheDocument();
    expect(screen.getByTestId("filter-dropdown-category")).toBeInTheDocument();
    // Check for sort dropdown
    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
    // Check for app cards container
    expect(screen.getByTestId("app-cards-container")).toBeInTheDocument();
  });

  it("shows the filter bar", () => {
    render(<App />);
    // Check for the filter bar container
    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    const mockClient = {
      getProjects: () => Promise.reject(new Error("API error")),
    } as typeof defaultTsRestClient;
    render(<App tsRestClient={mockClient} />);
    expect(
      await screen.findByText(/Failed to fetch projects/i)
    ).toBeInTheDocument();
  });
});
