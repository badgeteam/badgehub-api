import React from "react";
import { CategorySlug } from "@shared/domain/readModels/project/Category.ts";
import { BadgeSlug } from "@shared/domain/readModels/Badge.ts";
import { CategorySelector } from "@sharedComponents/OptionSelector/CategorySelector.tsx";
import { BadgeSelector } from "@sharedComponents/OptionSelector/BadgeSelector.tsx";

interface FiltersProps {
  badge: BadgeSlug | undefined;
  category: CategorySlug | undefined;
  sortBy: string | undefined;
  onDeviceChange: (value: string | undefined) => void;
  onCategoryChange: (value: string | undefined) => void;
  onSortByChange: (value: string | undefined) => void;
  onApplyFilters: () => void;
}
const NO_FILTER_OPTION_VALUE = "All";

const Filters: React.FC<FiltersProps> = ({
  badge,
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
        <BadgeSelector
          noValueSetName={"All"}
          badge={badge}
          onBadgeChange={onDeviceChange}
        />
        <CategorySelector
          noValueSetName={"All"}
          category={category}
          onCategoryChange={onCategoryChange}
        />
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
