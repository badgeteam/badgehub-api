import React from "react";
import { ProjectDetails } from "@shared/domain/readModels/project/ProjectDetails.ts";

const AppSidebarDetails: React.FC<{ project: ProjectDetails }> = ({
  project,
}) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-slate-100 mb-4 border-b border-gray-700 pb-2">
      App Details
    </h2>
    <ul className="text-sm text-slate-300 space-y-3 font-roboto-mono">
      <li>
        <strong>Version:</strong> {project.version?.revision ?? "—"}
      </li>
      <li>
        <strong>License:</strong>{" "}
        {project.version.app_metadata.license_type ?? "—"}
      </li>
      <li>
        <strong>Badges:</strong>{" "}
        {project.version.app_metadata.badges?.join(", ") ?? "—"}{" "}
      </li>
      <li>
        <strong>Categories:</strong>{" "}
        {project.version.app_metadata.categories?.join(",") ?? "—"}
      </li>
      <li>
        <strong>Type:</strong>{" "}
        {project.version.app_metadata.project_type ?? "app"}
      </li>
      <li>
        <strong>Downloads:</strong>{" "}
        {project.version?.download_count ?? "Download count not available"}
      </li>
      <li>
        <strong>Rating:</strong>{" "}
        {
          "4.8/5 (120 votes)" // TODO
        }
      </li>
    </ul>
  </section>
);

export default AppSidebarDetails;
