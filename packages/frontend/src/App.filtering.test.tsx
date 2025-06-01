import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";
import userEvent from "@testing-library/user-event";

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
    await userEvent.selectOptions(mcuDropdown, "ESP32");
    // Wait for spinner to disappear
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      if (app.badges?.includes("ESP32")) {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });

  it("filters by category", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    const categoryDropdown = screen.getByTestId("filter-dropdown-category");
    await userEvent.selectOptions(categoryDropdown, "Wearables");
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      if (app.category === "Wearables") {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });

  it("filters by both device and category", async () => {
    render(<App tsRestClient={tsRestClientWithApps(dummyApps)} />);
    const mcuDropdown = screen.getByTestId("filter-dropdown-mcu");
    const categoryDropdown = screen.getByTestId("filter-dropdown-category");
    await userEvent.selectOptions(mcuDropdown, "ESP32");
    await userEvent.selectOptions(categoryDropdown, "Sensors");
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );
    dummyApps.forEach((app) => {
      const match = app.badges?.includes("ESP32") && app.category === "Sensors";
      if (match) {
        expect(screen.getByText(app.name!)).toBeInTheDocument();
      } else if (app.name) {
        expect(screen.queryByText(app.name)).not.toBeInTheDocument();
      }
    });
  });
});
