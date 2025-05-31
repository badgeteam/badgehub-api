import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Basic smoke test for App rendering

describe("App", () => {
  it("renders the homepage without crashing", () => {
    render(<App />);
    // Check for hero headline
    expect(screen.getByText(/Share\. Build\. Innovate\./i)).toBeInTheDocument();
    // Check for at least one featured app card
    expect(screen.getByText(/Weather Station Deluxe/i)).toBeInTheDocument();
    // Check for navigation (desktop or mobile)
    expect(screen.getAllByText(/Browse Apps/i).length).toBeGreaterThan(0);
    // Check for footer
    expect(
      screen.getByText(/μAppHub. All rights reserved./i)
    ).toBeInTheDocument();
  });
});
