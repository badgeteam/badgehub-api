import { describe, expect, it } from "vitest";
import {
  dummyApps,
  privateTsRestClientBuilder,
  privateTsRestClientWithError,
  render,
  screen,
  waitFor,
} from "@__test__";
import MyProjectsPage from "./MyProjectsPage.tsx";

describe("MyProjectsPage", () => {
  it("renders the page with user draft projects", async () => {
    render(
      <MyProjectsPage tsRestClient={privateTsRestClientBuilder(dummyApps)} />
    );
    await waitFor(() => {
      const appCardElements = screen.getAllByTestId("AppCard");
      expect(appCardElements.length).toBeGreaterThan(0);
    });
    expect(screen.getByTestId("filter-dropdown-mcu")).toBeInTheDocument();
    expect(screen.getByTestId("filter-dropdown-category")).toBeInTheDocument();
    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("app-cards-container")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    render(<MyProjectsPage tsRestClient={privateTsRestClientWithError()} />);
    expect(
      await screen.findByText(/Failed to fetch your draft projects.*/i, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows a message or empty state when there are no draft projects", async () => {
    render(<MyProjectsPage tsRestClient={privateTsRestClientBuilder([])} />);
    expect(screen.queryByTestId("app-cards-container")).not.toBeInTheDocument();
    expect(await screen.findByText(/No apps found\./i)).toBeInTheDocument();
  });
});
