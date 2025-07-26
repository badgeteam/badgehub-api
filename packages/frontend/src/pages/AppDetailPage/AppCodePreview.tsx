import React, { useEffect, useState } from "react";
import { tsRestClient } from "@api/tsRestClient.ts";
import { ProjectDetails } from "@shared/domain/readModels/project/ProjectDetails.ts";
import { BADGEHUB_API_BASE_URL } from "@config.ts";

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-slate-300 hover:text-slate-100"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    style={{ display: "inline", verticalAlign: "middle" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
    />
  </svg>
);

const AppCodePreview: React.FC<{ project: ProjectDetails }> = ({ project }) => {
  const files = project?.version?.files ?? [];
  const [previewedFile, setPreviewedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Find __init__.py by default
  useEffect(() => {
    if (!files?.length) {
      setPreviewedFile(null);
      setFileContent(null);
      return;
    }
    const initFile = files.find(
      (f) =>
        (f.name === "__init__" && f.ext === "py") ||
        f.full_path === "__init__.py"
    );
    if (initFile) {
      setPreviewedFile(initFile.full_path);
    } else {
      setPreviewedFile(null);
      setFileContent(null);
    }
  }, [files]);

  // Fetch file content when previewedFile changes
  useEffect(() => {
    if (!previewedFile) {
      setFileContent(null);
      return;
    }
    setLoading(true);
    tsRestClient
      .getLatestPublishedFile({
        params: {
          slug: project.slug,
          filePath: previewedFile,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (typeof res.body === "string") {
            setFileContent(res.body);
          } else if (res.body instanceof Blob) {
            res.body.text().then(setFileContent);
          } else {
            setFileContent("// Unable to display file content");
          }
        } else {
          setFileContent("// Unable to load file");
        }
        setLoading(false);
      });
  }, [previewedFile, project.slug]);

  const handlePreview = (fullPath: string) => {
    setPreviewedFile(fullPath);
  };

  const handleDownload = (url: string) => {
    window.location.href = url;
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
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
                <button
                  className="px-1 py-1 bg-slate-700 rounded hover:bg-slate-600"
                  onClick={() => handleDownload(f.url)}
                  title="Download file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <DownloadIcon />
                </button>
                <button
                  className={`text-left hover:underline font-mono ${
                    previewedFile === f.full_path
                      ? "text-slate-100 font-bold"
                      : "text-slate-400"
                  }`}
                  onClick={() => handlePreview(f.full_path)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  title="Preview file"
                >
                  {f.full_path}
                </button>
                {f.size_formatted ? (
                  <span className="ml-2 text-slate-500">
                    {f.size_formatted}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 md:ml-0">
        <div className="code-block font-roboto-mono text-sm bg-gray-900 rounded p-4 overflow-x-auto min-h-[200px]">
          <pre>
            <code>
              {loading
                ? "// Loading file..."
                : previewedFile
                  ? (fileContent ?? "// Loading file...")
                  : "// No file selected"}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default AppCodePreview;
