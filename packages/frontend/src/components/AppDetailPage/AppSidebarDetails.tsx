import React from "react";
import { Project } from "@shared/domain/readModels/project/Project.ts";

const AppSidebarDetails: React.FC<{ project: Project }> = ({ project }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-slate-100 mb-4 border-b border-gray-700 pb-2">
      App Details
    </h2>
    <ul className="text-sm text-slate-300 space-y-3 font-roboto-mono">
      <li>
        <strong>Version:</strong> {project.version?.revision ?? "—"}
      </li>
      <li>
        <strong>License:</strong> {project.license ?? "—"}
      </li>
      {/*<li>*/}
      {/*  <strong>MCU:</strong>{" "}*/}
      {/*  {(project as unknown as { devices: string[] }).devices?.join(", ") ?? "—"} // TODO*/}
      {/*</li>*/}
      <li>
        <strong>Category:</strong> {project.category ?? "—"}
      </li>
      <li>
        <strong>Interpreter:</strong> {project.interpreter ?? "Native Binary"}
      </li>
      <li>
        <strong>Dependencies:</strong>{" "}
        {
          (project as unknown as { dependencies: string[] }).dependencies?.join(
            ", "
          ) ?? "No dependencies" /*TODO*/
        }
      </li>
      <li>
        <strong>Downloads:</strong>{" "}
        {project.version?.download_count ?? "Download count not available"}
      </li>
      <li>
        <strong>Rating:</strong>{" "}
        {(project as unknown as { rating: string[] }).rating ??
          "4.8/5 (120 votes)"}
      </li>
    </ul>
  </section>
);

export default AppSidebarDetails;
