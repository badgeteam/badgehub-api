import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import AppsGrid from "./components/AppsGrid";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import "./App.css";
import type { AppCardProps } from "./components/types.ts";
import { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "./api/tsRestClient";
import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import { z } from "zod";

interface AppProps {
  tsRestClient?: typeof defaultTsRestClient;
}

function App({ tsRestClient = defaultTsRestClient }: AppProps) {
  const [apps, setApps] = useState<AppCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [device, setDevice] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Popularity");
  const [filtersChanged, setFiltersChanged] = useState(false);

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
        if (res.status === 200) {
          const body = res.body;
          setApps(body);
          setError(null);
        } else {
          setError("Failed to fetch projects");
        }
      })
      .catch(() => setError("Failed to fetch projects"))
      .finally(() => setLoading(false));
  }, [tsRestClient, device, category, filtersChanged]);

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
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
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
          <div className="text-center py-10 text-red-400">{error}</div>
        ) : (
          <AppsGrid apps={apps} />
        )}
        <Pagination />
      </main>
      <Footer />
    </div>
  );
}

export default App;
