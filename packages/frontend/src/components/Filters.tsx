import React from "react";

const Filters: React.FC = () => (
  <section className="mb-8 p-4 bg-gray-800 rounded-lg shadow">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label
          htmlFor="mcu-filter"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Microcontroller
        </label>
        <select
          id="mcu-filter"
          name="mcu-filter"
          data-testid="filter-dropdown-mcu"
          className="w-full bg-gray-700 border-gray-600 text-slate-200 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 text-sm"
        >
          <option>All</option>
          <option>ESP32</option>
          <option>Raspberry Pi Pico</option>
          <option>Arduino Uno</option>
          <option>STM32</option>
          <option>nRF52</option>
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
        >
          <option>All</option>
          <option>IoT</option>
          <option>Robotics</option>
          <option>Sensors</option>
          <option>Display</option>
          <option>Automation</option>
          <option>Wearables</option>
        </select>
      </div>
      <div>
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
        >
          <option>Popularity</option>
          <option>Recent</option>
          <option>Rating</option>
          <option>A-Z</option>
        </select>
      </div>
      <div className="flex items-end">
        <button className="w-full btn-primary px-4 py-2 rounded-md text-sm font-semibold flex items-center justify-center">
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
