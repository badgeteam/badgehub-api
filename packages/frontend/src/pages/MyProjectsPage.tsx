import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import AppGridWithFilterAndPagination from "../components/AppGridWithFilterAndPagination";
import React, { memo, useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../api/tsRestClient.ts";
import { useSession } from "../components/keycloakSession/SessionContext";
import type { AppCardProps } from "../components/types";
import { PleaseLoginMessage } from "@pages/PleaseLoginMessage.tsx";

interface MyProjectsPageProps {
  tsRestClient?: typeof defaultTsRestClient;
}

const MyProjectsPage = memo(
  ({ tsRestClient = defaultTsRestClient }: MyProjectsPageProps) => {
    const { user, keycloak } = useSession();
    const [apps, setApps] = useState<AppCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [device, setDevice] = useState<string>("All");
    const [category, setCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("Popularity");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12;
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      if (!keycloak || !user?.id) {
        return;
      }
      setLoading(true);
      keycloak
        .updateToken()
        .then(
          () =>
            tsRestClient.getUserDraftProjects({
              headers: {
                authorization: `Bearer ${user.token}`,
              },
              params: {
                userId: user.id,
              },
            }),
          () => {
            setError("Failed to update session token");
            setLoading(false);
            return undefined;
          }
        )
        .then((res) => {
          if (!res) return;
          if (res.status === 200 && typeof res.body === "object") {
            setApps(res.body);
            setError(null);
          } else {
            setError("Failed to fetch your draft projects");
          }
        })
        .catch(() => setError("Failed to fetch your draft projects"))
        .finally(() => setLoading(false));
    }, [tsRestClient, user, device, category, filtersChanged, keycloak]);
    const userIsLoggedIn = Boolean(user?.id && keycloak?.authenticated);
    const handleDeviceChange = (value: string) => setDevice(value);
    const handleCategoryChange = (value: string) => setCategory(value);
    const handleSortByChange = (value: string) => setSortBy(value);
    const handleApplyFilters = () => setFiltersChanged((v) => !v);

    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-slate-200">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={(q: string) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
        />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {!userIsLoggedIn ? (
            <PleaseLoginMessage whatToSee={"your projects"} />
          ) : (
            <AppGridWithFilterAndPagination
              apps={apps}
              loading={loading}
              error={error}
              device={device}
              category={category}
              sortBy={sortBy}
              currentPage={currentPage}
              pageSize={pageSize}
              searchQuery={searchQuery}
              onDeviceChange={handleDeviceChange}
              onCategoryChange={handleCategoryChange}
              onSortByChange={handleSortByChange}
              onApplyFilters={handleApplyFilters}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
);

export default MyProjectsPage;
