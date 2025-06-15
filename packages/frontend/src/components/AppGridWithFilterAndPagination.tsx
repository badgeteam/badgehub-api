import { useEffect, useMemo, useState } from "react";
import type { AppCardProps } from "@components/types.ts";
import Filters from "@components/AppsGrid/Filters.tsx";
import Spinner from "@components/Spinner.tsx";
import AppsGrid from "@components/AppsGrid/AppsGrid.tsx";
import Pagination from "@components/AppsGrid/Pagination.tsx";
import { ProjectWithoutVersion } from "@shared/domain/readModels/project/Project.ts";
import { z } from "zod";
import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";

export type ProjectQueryParams = z.infer<typeof getProjectsQuerySchema>;
export type AppFetcher = (
  filters: ProjectQueryParams
) => Promise<ProjectWithoutVersion[] | undefined>;

export const AppGridWithFilterAndPagination = ({
  appFetcher,
  searchQuery,
}: {
  appFetcher: AppFetcher;
  searchQuery: string;
}) => {
  const [apps, setApps] = useState<AppCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [device, setDevice] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;
  const [filtersChanged, setFiltersChanged] = useState(false);

  // Fetch apps with filters
  useEffect(() => {
    setLoading(true);

    appFetcher({ device, category })
      .then((res) => {
        if (typeof res === "object") {
          const body = res;
          setApps(body);
          setError(null);
        } else {
          setError("Failed to fetch projects, invalid response type.");
        }
      })
      .catch((e) => {
        console.error(e);
        setError(e.message || "Failed to fetch projects");
      })
      .finally(() => setLoading(false));
  }, [device, category, filtersChanged, appFetcher]);

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
  const handleDeviceChange = (value: string | undefined) => setDevice(value);
  const handleCategoryChange = (value: string | undefined) =>
    setCategory(value);
  const handleSortByChange = (value: string | undefined) => setSortBy(value);
  const handleApplyFilters = () => setFiltersChanged((v) => !v);

  return (
    <>
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
    </>
  );
};
