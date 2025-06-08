import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AppDetail from "./AppDetail";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";

describe(
  "AppDetail",
  () => {
    it("renders app details when found", async () => {
      const app = dummyApps[0]!;
      render(
        <AppDetail
          tsRestClient={tsRestClientWithApps(dummyApps)}
          slug={"dummy-app-1"}
        />
      );
      // Wait until the detail page renders
      await screen.findByTestId("app-detail-page");

      expect(screen.getByTestId("app-detail-name")).toHaveTextContent(
        app.name!
      );
      expect(await screen.findByText(app.description!)).toBeInTheDocument();
      expect(screen.getAllByText(app.category).length).toBeGreaterThan(0);
      if (app.badges && app.badges.length > 0) {
        expect(screen.queryAllByText(app.badges[0]!).length).toBeGreaterThan(0);
      }
    });
    it("renders the app revision", async () => {
      const app = dummyApps[0]!;
      render(
        <AppDetail
          tsRestClient={tsRestClientWithApps(dummyApps)}
          slug={"dummy-app-1"}
        />
      );
      // Revision text is rendered as "Revision: {revision}", so use a flexible matcher
      expect(
        (
          await screen.findAllByText((content) =>
            content.includes(String(app.revision ?? ""))
          )
        ).length
      ).toBeGreaterThan(0);
    });
    it.skip("shows error if app not found", async () => {
      //TODO
      render(
        <AppDetail
          tsRestClient={tsRestClientWithApps(dummyApps)}
          slug={"dummy-app-1"}
        />
      );
      await waitFor(() =>
        expect(screen.getByTestId("app-detail-error")).toBeInTheDocument()
      );
    });
  },
  { timeout: 1000_000 }
);
