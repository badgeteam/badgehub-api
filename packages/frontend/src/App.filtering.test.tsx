import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";
import userEvent from "@testing-library/user-event";
import { CATEGORIES } from "@shared/domain/readModels/project/Category.ts";
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

  it("filters by microcontroller/device", async () => {
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
    await userEvent.selectOptions(categoryDropdown, CATEGORIES.silly);

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      dummyApps.forEach((app) => {
        if (app.category === CATEGORIES.silly) {
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
    await userEvent.selectOptions(categoryDropdown, CATEGORIES.silly);
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      const match =
        app.badges?.includes("mch2022") && app.category === CATEGORIES.silly;
      if (match) {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });
});
