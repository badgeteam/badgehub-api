import Filters from "./AppsGrid/Filters";
import AppsGrid from "./AppsGrid/AppsGrid";
import Pagination from "./AppsGrid/Pagination";
import Spinner from "./Spinner";
import type { AppCardProps } from "./types";
import { useMemo } from "react";

interface AppGridWithFilterAndPaginationProps {
  apps: AppCardProps[];
  loading: boolean;
  error: string | null;
  device: string;
  category: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  onDeviceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onApplyFilters: () => void;
  onPageChange: (page: number) => void;
}

const AppGridWithFilterAndPagination = ({
  apps,
  loading,
  error,
  device,
  category,
  sortBy,
  currentPage,
  pageSize,
  searchQuery,
  onDeviceChange,
  onCategoryChange,
  onSortByChange,
  onApplyFilters,
  onPageChange,
}: AppGridWithFilterAndPaginationProps) => {
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
  }, [filteredApps, currentPage, pageSize]);

  return (
    <>
      <Filters
        device={device}
        category={category}
        sortBy={sortBy}
        onDeviceChange={onDeviceChange}
        onCategoryChange={onCategoryChange}
        onSortByChange={onSortByChange}
        onApplyFilters={onApplyFilters}
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
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default AppGridWithFilterAndPagination;
