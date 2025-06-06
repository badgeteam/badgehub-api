import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AppDetail from "./AppDetail";
import { tsRestClientWithApps } from "@__test__/tsRestClientBuilder";
import { dummyApps } from "@__test__/fixtures/dummyApps";

describe("AppDetail", () => {
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

    expect(screen.getByTestId("app-title")).toHaveTextContent(app.name!);
    expect(screen.getByText(app.description!)).toBeInTheDocument();
    expect(screen.getByText(app.category!)).toBeInTheDocument();
    if (app.badges && app.badges.length > 0) {
      expect(screen.getByText(app.badges[0]!)).toBeInTheDocument();
    }
    // Revision text is rendered as "Revision: {revision}", so use a flexible matcher
    expect(
      screen.getByText((content) =>
        content.includes(`Revision: ${app.revision ?? "-"}`)
      )
    ).toBeInTheDocument();
  });

  it("shows error if app not found", async () => {
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
});
