import { useEffect, useMemo, useState } from "react";
import type { AppCardProps } from "@sharedComponents/types.ts";
import Filters from "@sharedComponents/AppsGrid/Filters.tsx";
import Spinner from "@sharedComponents/Spinner.tsx";
import AppsGrid from "@sharedComponents/AppsGrid/AppsGrid.tsx";
import Pagination from "@sharedComponents/AppsGrid/Pagination.tsx";
import { ProjectWithoutVersion } from "@shared/domain/readModels/project/Project.ts";
import { z } from "zod";
import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import {
  CategoryName,
  CategorySlug,
} from "@shared/domain/readModels/project/Category.ts";
import { BadgeSlug } from "@shared/domain/readModels/Badge.ts";

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
  const [device, setDevice] = useState<BadgeSlug | undefined>();
  const [category, setCategory] = useState<CategorySlug | undefined>();
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
  const handleBadgeChange = (value: BadgeSlug | undefined) => setDevice(value);
  const handleCategoryChange = (value: CategorySlug | undefined) =>
    setCategory(value);
  const handleSortByChange = (value: string | undefined) => setSortBy(value);
  const handleApplyFilters = () => setFiltersChanged((v) => !v);

  return (
    <>
      <Filters
        badge={device}
        category={category}
        sortBy={sortBy}
        onBadgeChange={handleBadgeChange}
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
