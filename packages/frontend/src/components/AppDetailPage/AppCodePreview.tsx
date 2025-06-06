import React, { useEffect, useState } from "react";
import { tsRestClient } from "@api/tsRestClient.ts";
import { Project } from "@shared/domain/readModels/project/Project.ts";

const AppCodePreview: React.FC<{ project: Project }> = ({ project }) => {
  const [initPyCode, setInitPyCode] = useState<string | null>(null);
  const [initPyFound, setInitPyFound] = useState<boolean>(false);

  const files = project?.version?.files;
  useEffect(() => {
    if (!files?.length) {
      setInitPyFound(false);
      setInitPyCode(null);
      return;
    }
    // Find __init__.py in the files list
    const initFile = files.find(
      (f) =>
        (f.name === "__init__" && f.ext === "py") ||
        f.full_path === "__init__.py"
    );
    if (initFile) {
      setInitPyFound(true);
      // Fetch the file content using the API
      tsRestClient
        .getLatestPublishedFile({
          params: {
            slug: project.slug,
            filePath: initFile.full_path,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // Try to decode as string (assuming text)
            if (typeof res.body === "string") {
              setInitPyCode(res.body);
            } else if (res.body instanceof Blob) {
              res.body.text().then(setInitPyCode);
            } else {
              setInitPyCode("// Unable to display file content");
            }
          } else {
            setInitPyCode("// Unable to load __init__.py");
          }
        });
    } else {
      setInitPyFound(false);
      setInitPyCode(null);
    }
  }, [project.slug, files]);

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-100 mb-4">
        Code Preview / Files
      </h2>
      <div className="code-block font-roboto-mono text-sm">
        <pre>
          <code>
            {initPyFound
              ? initPyCode === null
                ? "// Loading __init__.py..."
                : initPyCode
              : "// No __init__.py file was found"}
          </code>
        </pre>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-slate-200 mb-2">
          Project Files:
        </h3>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
          {files.map((f, i: number) => (
            <li key={i}>
              <code>{f.full_path}</code>
              {f.size_formatted ? ` - ${f.size_formatted}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AppCodePreview;
