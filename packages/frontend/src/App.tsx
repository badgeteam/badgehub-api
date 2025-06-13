import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/AppsGrid/Filters.tsx";
import AppsGrid from "./components/AppsGrid/AppsGrid.tsx";
import Pagination from "./components/AppsGrid/Pagination.tsx";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import "./App.css";
import type { AppCardProps } from "./components/types.ts";
import { memo, useEffect, useMemo, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "./api/tsRestClient";
import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import { z } from "zod";

interface AppProps {
  tsRestClient?: typeof defaultTsRestClient;
}

const App = memo(({ tsRestClient = defaultTsRestClient }: AppProps) => {
  const [apps, setApps] = useState<AppCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [device, setDevice] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Popularity");
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;
  const [filtersChanged, setFiltersChanged] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch apps with filters
  useEffect(() => {
    setLoading(true);
    const query: z.infer<typeof getProjectsQuerySchema> = {};
    if (device && device !== "All") query.device = device;
    if (category && category !== "All") query.category = category;
    // Pagination and sort can be added here as needed

    tsRestClient
      .getProjects({ query })
      .then((res) => {
        if (res.status === 200 && typeof res.body === "object") {
          const body = res.body;
          setApps(body);
          setError(null);
        } else {
          setError("Failed to fetch projects");
        }
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch projects");
      })
      .finally(() => setLoading(false));
  }, [tsRestClient, device, category, filtersChanged]);

  // Filter apps by search query before pagination
  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    return apps.filter((app) =>
      app.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [apps, searchQuery]);

  // Compute paginated apps from filteredApps
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApps.slice(start, start + pageSize);
  }, [filteredApps, currentPage]);

  // Handlers for Filters component
  const handleDeviceChange = (value: string) => setDevice(value);
  const handleCategoryChange = (value: string) => setCategory(value);
  const handleSortByChange = (value: string) => setSortBy(value);
  const handleApplyFilters = () => setFiltersChanged((v) => !v);

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
      data-testid="main-page"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={(q: string) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
        {/* Removed duplicate search bar here */}
        <Filters
          device={device}
          category={category}
          sortBy={sortBy}
          onDeviceChange={handleDeviceChange}
          onCategoryChange={handleCategoryChange}
          onSortByChange={handleSortByChange}
          onApplyFilters={handleApplyFilters}
        />
        {loading ? (
          <Spinner />
        ) : error ? (
          <div
            data-testid="error-message"
            className="text-center py-10 text-red-400"
          >
            {error}
          </div>
        ) : (
          <AppsGrid apps={paginatedApps} />
        )}
        {/* show pagination if more than one page */}
        {Math.ceil(filteredApps.length / pageSize) > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredApps.length / pageSize)}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
});

export default App;
