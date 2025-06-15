import React from "react";
import { CATEGORY_MAP } from "@shared/domain/readModels/project/Category.ts";
import { BADGE_MAP } from "@shared/domain/readModels/Badge.ts";

interface FiltersProps {
  device: string | undefined;
  category: string | undefined;
  sortBy: string | undefined;
  onDeviceChange: (value: string | undefined) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortByChange: (value: string | undefined) => void;
  onApplyFilters: () => void;
}
const NO_FILTER_OPTION_VALUE = "All";
const BADGE_SLUGS = Object.keys(BADGE_MAP) as Array<keyof typeof BADGE_MAP>;
const CATEGORY_SLUGS = Object.keys(CATEGORY_MAP) as Array<
  keyof typeof CATEGORY_MAP
>;
const Filters: React.FC<FiltersProps> = ({
  device,
  category,
  sortBy,
  onDeviceChange,
  onCategoryChange,
  onSortByChange,
  onApplyFilters,
}) => {
  return (
    <section
      className="mb-8 p-4 bg-gray-800 rounded-lg shadow"
      data-testid="filter-bar"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="mcu-filter"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Badge
          </label>
          <select
            id="mcu-filter"
            name="mcu-filter"
            data-testid="filter-dropdown-mcu"
            className="w-full border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
            value={device}
            onChange={(e) =>
              onDeviceChange(
                e.target.value === NO_FILTER_OPTION_VALUE
                  ? undefined
                  : e.target.value
              )
            }
          >
            <option value={NO_FILTER_OPTION_VALUE}>All</option>
            {BADGE_SLUGS.map((option) => (
              <option key={option} value={option}>
                {BADGE_MAP[option]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Category
          </label>
          <select
            id="category-filter"
            name="category-filter"
            data-testid="filter-dropdown-category"
            className="w-full border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
            value={category}
            onChange={(e) =>
              onCategoryChange(
                e.target.value === NO_FILTER_OPTION_VALUE
                  ? undefined
                  : e.target.value
              )
            }
          >
            <option value={NO_FILTER_OPTION_VALUE}>All</option>
            {CATEGORY_SLUGS.map((option) => (
              <option key={option} value={option}>
                {CATEGORY_MAP[option]}
              </option>
            ))}
          </select>
        </div>
        <div className="todoElement">
          <label
            htmlFor="sort-by"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Sort By
          </label>
          <select
            id="sort-by"
            name="sort-by"
            data-testid="sort-dropdown"
            className="w-full border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
            value={sortBy}
            onChange={(e) =>
              onSortByChange(
                e.target.value === NO_FILTER_OPTION_VALUE
                  ? undefined
                  : e.target.value
              )
            }
          >
            <option value={NO_FILTER_OPTION_VALUE}>Arbitrary</option>
          </select>
        </div>
        <div className="flex items-end todoElement">
          <button
            className="w-full btn-primary px-4 py-2 rounded-md text-sm font-semibold flex items-center justify-center"
            type="button"
            onClick={onApplyFilters}
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-6.586L4.293 6.707A1 1 0 014 6V3z" />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filters;
