import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { memo, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../api/tsRestClient.ts";
import {
  AppFetcher,
  AppGridWithFilterAndPagination,
} from "@components/AppGridWithFilterAndPagination.tsx";
import { useSession } from "@components/keycloakSession/SessionContext.tsx";
import { PleaseLoginMessage } from "@pages/PleaseLoginMessage.tsx";

interface AppProps {
  tsRestClient?: typeof defaultTsRestClient;
}

const MyProjectsPage = memo(
  ({ tsRestClient = defaultTsRestClient }: AppProps) => {
    const { user, keycloak } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const userIsLoggedIn = keycloak?.authenticated && user?.id;
    const appFetcher: AppFetcher | undefined = userIsLoggedIn
      ? async () => {
          await keycloak.updateToken(30).catch((e) => {
            console.error("Failed to update token", e);
            throw new Error(
              "Failed to update token. Please try logging in again."
            );
          }); // Ensure token is fresh
          const result = await tsRestClient
            ?.getUserDraftProjects({
              params: {
                userId: user.id,
              },
              headers: {
                authorization: `Bearer ${user.token}`,
              },
            })
            .catch((e) => {
              console.error("Failed to fetch draft projects", e);
              throw new Error(
                "Failed to fetch your draft projects. Message: " + e.message
              );
            });
          switch (result.status) {
            case 200:
              return result.body;
            default:
              throw new Error(
                "Failed to fetch projects, reason " +
                  (result.body as { reason: string })?.reason
              );
          }
        }
      : undefined;
    return (
      <div
        className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
        data-testid="my-projects-page"
      >
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {appFetcher ? (
            <AppGridWithFilterAndPagination
              appFetcher={appFetcher}
              searchQuery={searchQuery}
            />
          ) : (
            <PleaseLoginMessage whatToSee={"your projects"} />
          )}
        </main>
        <Footer />
      </div>
    );
  }
);

export default MyProjectsPage;
