import React from "react";
import { CATEGORIE_NAMES } from "@shared/domain/readModels/project/Category.ts";
import { BADGE_NAMES } from "@shared/domain/readModels/Badge.ts";

interface FiltersProps {
  device: string;
  category: string;
  sortBy: string;
  onDeviceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onApplyFilters: () => void;
}

const BADGES = Object.values(BADGE_NAMES);
const BADGES_KEYS_MAP = Object.fromEntries(
  Object.entries(BADGE_NAMES).map(([key, value]) => [value, key])
);

const CATEGORY_OPTIONS = Object.values(CATEGORIE_NAMES);
const CATEGORY_KEYS_MAP = Object.fromEntries(
  Object.entries(CATEGORIE_NAMES).map(([key, value]) => [value, key])
);
const Filters: React.FC<FiltersProps> = ({
  device,
  category,
  sortBy,
  onDeviceChange,
  onCategoryChange,
  onSortByChange,
  onApplyFilters,
}) => (
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
          className="w-full bg-gray-700 border-gray-600 text-slate-200 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
          value={device}
          onChange={(e) => onDeviceChange(e.target.value)}
        >
          <option value="All">All</option>
          {BADGES.map((option) => (
            <option key={option} value={BADGES_KEYS_MAP[option]}>
              {option}
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
          className="w-full bg-gray-700 border-gray-600 text-slate-200 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={CATEGORY_KEYS_MAP[option]}>
              {option}
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
          className="w-full bg-gray-700 border-gray-600 text-slate-200 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option>Arbitrary</option>
        </select>
      </div>
      <div className="flex items-end todoElement">
        <button
          className="w-full btn-primary px-4 py-2 rounded-md text-sm font-semibold flex items-center justify-center"
          type="button"
          onClick={onApplyFilters}
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-6.586L4.293 6.707A1 1 0 014 6V3z" />
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  </section>
);

export default Filters;
