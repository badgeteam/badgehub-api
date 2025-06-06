import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";
import userEvent from "@testing-library/user-event";
import { CATEGORIE_NAMES } from "@shared/domain/readModels/project/Category.ts";
import { BADGE_NAMES } from "@shared/domain/readModels/Badge.ts";

describe("App filtering", () => {
  it("shows all apps by default", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    await waitFor(() => {
      dummyApps.forEach((app) => {
        if (app.name) {
          expect(screen.getByText(app.name)).toBeInTheDocument();
        }
      });
    });
  });

  it("filters by Badge/device", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    const mcuDropdown = screen.getByTestId("filter-dropdown-mcu");
    // Use a badge value that exists in dummyApps, e.g., "mch2022"
    await userEvent.selectOptions(mcuDropdown, BADGE_NAMES.mch2022);
    // Wait for spinner to disappear
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      if (app.badges?.includes(BADGE_NAMES.mch2022)) {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });

  it("filters by category", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    const categoryDropdown = screen.getByTestId("filter-dropdown-category");
    // Use a category value that exists in dummyApps, e.g., CATEGORIES.silly
    await userEvent.selectOptions(categoryDropdown, "silly");
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      dummyApps.forEach((app) => {
        if (app.category === CATEGORIE_NAMES.silly) {
          // Use a function matcher to be more flexible with text rendering
          expect(
            screen.getByText((content) => content.includes(app.name!))
          ).toBeInTheDocument();
        } else if (app.name) {
          expect(
            screen.queryByText((content) => content.includes(app.name!))
          ).not.toBeInTheDocument();
        }
      })
    );
  });

  it("filters by both device and category", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    const mcuDropdown = screen.getByTestId("filter-dropdown-mcu");
    const categoryDropdown = screen.getByTestId("filter-dropdown-category");
    // Use values that exist together in an app, e.g., "mch2022" and CATEGORIES.silly
    await userEvent.selectOptions(mcuDropdown, "mch2022");
    await userEvent.selectOptions(categoryDropdown, CATEGORIE_NAMES.silly);
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      const match =
        app.badges?.includes("mch2022") &&
        app.category === CATEGORIE_NAMES.silly;
      if (match) {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });

  it("filters apps by search query", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    // Wait for apps to load
    await screen.findByText(dummyApps[0]!.name!);
    const searchBar = await screen.findByTestId("search-bar");
    // Type a partial name of the first app
    const searchTerm = "game";
    await userEvent.clear(searchBar);
    await userEvent.type(searchBar, searchTerm);

    // Only apps whose name includes the search term should be visible
    await waitFor(() => {
      dummyApps.forEach((app) => {
        if (app.name?.toLowerCase().includes(searchTerm)) {
          expect(screen.getByText(app.name!)).toBeInTheDocument();
        } else if (app.name) {
          expect(screen.queryByText(app.name)).not.toBeInTheDocument();
        }
      });
    });
  });
});
