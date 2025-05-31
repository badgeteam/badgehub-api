import React from "react";

const Pagination: React.FC = () => (
  <nav className="mt-10 flex justify-center" aria-label="Pagination">
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors"
    >
      <span className="sr-only">Previous</span>
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
    <a
      href="#"
      aria-current="page"
      className="relative z-10 inline-flex items-center px-4 py-2 border border-emerald-500 bg-emerald-600 text-sm font-medium text-white"
    >
      1
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors"
    >
      2
    </a>
    <a
      href="#"
      className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors"
    >
      3
    </a>
    <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-500">
      ...
    </span>
    <a
      href="#"
      className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors"
    >
      8
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors"
    >
      <span className="sr-only">Next</span>
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  </nav>
);

export default Pagination;
