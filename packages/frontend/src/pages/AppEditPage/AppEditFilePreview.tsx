import React, { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";

const AppEditFilePreview: React.FC<{
  slug: string;
  tsRestClient?: typeof defaultTsRestClient;
  userToken: string | undefined;
  refreshKey: number;
  onSetIcon?: (filePath: string) => void;
  iconFilePath?: string | null;
}> = ({
  slug,
  tsRestClient = defaultTsRestClient,
  userToken,
  refreshKey,
  onSetIcon,
  iconFilePath,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [previewedFile, setPreviewedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setFiles([]);
    setPreviewedFile(null);
    setFileContent(null);
    setLoading(true);
    (async () => {
      const res = await tsRestClient.getDraftProject({
        headers: { authorization: `Bearer ${userToken}` },
        params: { slug },
      });
      if (mounted && res.status === 200) {
        setFiles(res.body?.version?.files ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [slug, tsRestClient, userToken, refreshKey]);

  useEffect(() => {
    if (!previewedFile) {
      setFileContent(null);
      return;
    }
    setLoading(true);
    tsRestClient
      .getDraftFile({
        headers: { authorization: `Bearer ${userToken}` },
        params: { slug, filePath: previewedFile },
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
  }, [previewedFile, slug, tsRestClient, userToken]);

  const handlePreview = (fullPath: string) => {
    setPreviewedFile(fullPath);
  };

  const handleSetIcon = (fullPath: string) => {
    if (onSetIcon) onSetIcon(fullPath);
  };

  // Only allow "Set as Icon" for .png files
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

export default AppEditFilePreview;
