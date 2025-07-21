import { useEffect, useMemo, useState } from "react";
import type { AppCardProps } from "@sharedComponents/types.ts";
import Filters from "@sharedComponents/AppsGrid/Filters.tsx";
import Spinner from "@sharedComponents/Spinner.tsx";
import AppsGrid from "@sharedComponents/AppsGrid/AppsGrid.tsx";
import Pagination from "@sharedComponents/AppsGrid/Pagination.tsx";
import { ProjectSummary } from "@shared/domain/readModels/project/ProjectDetails.ts";
import { z } from "zod/v4";
import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import { BadgeSlug } from "@shared/domain/readModels/Badge.ts";
import { CategoryName } from "@shared/domain/readModels/project/Category.ts";

export type ProjectQueryParams = z.infer<typeof getProjectsQuerySchema>;
export type AppFetcher = (
  filters: ProjectQueryParams
) => Promise<ProjectSummary[] | undefined>;

export const AppGridWithFilterAndPagination = ({
  appFetcher,
  searchQuery,
  editable = false,
}: {
  appFetcher: AppFetcher;
  searchQuery: string;
  editable?: boolean;
}) => {
  const [apps, setApps] = useState<AppCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [badge, setBadgeFilter] = useState<BadgeSlug | undefined>();
  const [category, setCategoryFilter] = useState<CategoryName | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  // Fetch apps with filters
  useEffect(() => {
    setLoading(true);

    appFetcher({ badge, category })
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
  }, [badge, category, appFetcher]);

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
  const handleBadgeChange = (value: BadgeSlug | undefined) =>
    setBadgeFilter(value);
  const handleCategoryChange = (value: CategoryName | undefined) =>
    setCategoryFilter(value);
  const handleSortByChange = (value: string | undefined) => setSortBy(value);
  const handleResetFilters = () => {
    setBadgeFilter(undefined);
    setCategoryFilter(undefined);
  };

  return (
    <>
      <Filters
        badge={badge}
        category={category}
        sortBy={sortBy}
        onBadgeChange={handleBadgeChange}
        onCategoryChange={handleCategoryChange}
        onSortByChange={handleSortByChange}
        onResetFilters={handleResetFilters}
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
        <AppsGrid apps={paginatedApps} editable={editable} />
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
