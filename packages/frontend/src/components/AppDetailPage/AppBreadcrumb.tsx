import React from "react";
import { Link } from "react-router-dom";

const AppBreadcrumb: React.FC<{ project: { name: string } }> = ({
  project,
}) => (
  <nav className="mb-6 text-sm" aria-label="Breadcrumb">
    <ol className="list-none p-0 inline-flex space-x-2">
      <li className="flex items-center">
        <Link to="/" className="text-emerald-400 hover:text-emerald-300">
          Home
        </Link>
      </li>
      <li className="flex items-center">
        <svg
          className="icon h-4 w-4 text-slate-400 mx-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <Link
          to="/#apps-grid"
          className="text-emerald-400 hover:text-emerald-300"
        >
          Apps
        </Link>
      </li>
      <li className="flex items-center">
        <svg
          className="icon h-4 w-4 text-slate-400 mx-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4-4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="text-slate-500">{project.name}</span>
      </li>
    </ol>
  </nav>
);

export default AppBreadcrumb;
