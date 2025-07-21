import React from "react";
import { ProjectDetails } from "@shared/domain/readModels/project/ProjectDetails.ts";
import { Link } from "react-router-dom";

const AppEditBreadcrumb: React.FC<{ project: ProjectDetails }> = ({
  project,
}) => {
  const appMetadata = project.version.app_metadata;
  return (
    <nav className="mb-6 text-sm" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-2">
        <li className="flex items-center">
          <Link to="/" className="text-emerald-400 hover:text-emerald-300">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2 text-slate-400">/</span>
          <Link
            to="/page/my-projects"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Apps
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2 text-slate-400">/</span>
          <Link
            to={`/page/project/${project.slug}`}
            className="text-emerald-400 hover:text-emerald-300"
          >
            {appMetadata.name}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-500">Edit</span>
        </li>
      </ol>
    </nav>
  );
};

export default AppEditBreadcrumb;
