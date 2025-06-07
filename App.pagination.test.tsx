import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Pagination", () => {
  test("renders first page and paginates to next page", async () => {
    render(<App />);

    // Wait for the first page to load (assume item with text "Item 1" is on first page)
    expect(await screen.findByText(/Item 1/i)).toBeInTheDocument();

    // Check that a next page button exists and click it
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Wait for the next page to load (assume item with text "Item 11" is on second page)
    expect(await screen.findByText(/Item 11/i)).toBeInTheDocument();
  });

  test("can go back to previous page", async () => {
    render(<App />);
    // Go to next page first
    const nextButton = await screen.findByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Wait for second page
    expect(await screen.findByText(/Item 11/i)).toBeInTheDocument();

    // Click previous
    const prevButton = screen.getByRole("button", { name: /prev/i });
    fireEvent.click(prevButton);

    // Wait for first page again
    expect(await screen.findByText(/Item 1/i)).toBeInTheDocument();
  });

  test("disables previous button on first page", async () => {
    render(<App />);
    const prevButton = await screen.findByRole("button", { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  test("disables next button on last page", async () => {
    render(<App />);
    // Go to last page by clicking next until disabled
    let nextButton = await screen.findByRole("button", { name: /next/i });
    while (!nextButton.disabled) {
      fireEvent.click(nextButton);
      await waitFor(() => {}); // wait for re-render
      nextButton = screen.getByRole("button", { name: /next/i });
    }
    expect(nextButton).toBeDisabled();
  });
});
