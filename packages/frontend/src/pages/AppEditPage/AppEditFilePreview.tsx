import React, { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";
import { Project } from "@shared/domain/readModels/project/Project.ts";
import { User } from "@sharedComponents/keycloakSession/SessionContext.tsx";

const AppEditFilePreview: React.FC<{
  user?: User; // Optional user prop for authentication
  tsRestClient: typeof defaultTsRestClient; // Replace with actual type if available
  project: Project;
  onSetIcon?: (filePath: string) => void;
  iconFilePath?: string | null;
  onDeleteFile?: (filePath: string) => void;
}> = ({ project, onSetIcon, iconFilePath, onDeleteFile }) => {
  const files = project?.version?.files ?? [];

  const handleSetIcon = (fullPath: string) => {
    if (onSetIcon) onSetIcon(fullPath);
  };

  const isPng = (filePath: string) => filePath.toLowerCase().endsWith(".png");

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg text-left mt-8">
      <h2 className="text-2xl font-semibold text-slate-100 mb-4">
        Code Preview / Files
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-full">
          <h3 className="text-lg font-medium text-slate-200 mb-2">
            Project Files:
          </h3>
          <ul className="list-none text-slate-400 text-sm space-y-1">
            {files.map((f, i: number) => (
              <li key={i} className="flex items-center gap-2">
                {onDeleteFile && (
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded p-1 flex items-center justify-center"
                    title="Delete file"
                    onClick={() => onDeleteFile(f.full_path)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m5 0H6"
                      />
                    </svg>
                  </button>
                )}
                <p
                  className={`text-left font-mono text-slate-400`}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  {f.full_path}
                </p>
                {f.size_formatted && (
                  <span className="ml-2 text-slate-500">
                    {f.size_formatted}
                  </span>
                )}
                {onSetIcon && isPng(f.full_path) && (
                  <button
                    type="button"
                    className={`ml-2 px-2 py-1 rounded text-xs ${
                      iconFilePath === f.full_path
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-700 text-slate-300 hover:bg-emerald-700 hover:text-white"
                    }`}
                    onClick={() => handleSetIcon(f.full_path)}
                    title={
                      iconFilePath === f.full_path
                        ? "This file is the current icon"
                        : "Set as icon"
                    }
                  >
                    {iconFilePath === f.full_path ? "Icon" : "Set as Icon"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AppEditFilePreview;
