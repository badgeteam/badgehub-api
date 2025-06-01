import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Basic smoke test for App rendering

describe("App", () => {
  it("renders the homepage without crashing", async () => {
    render(<App />);
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
  });
});
