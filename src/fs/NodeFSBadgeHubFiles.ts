import { BadgeHubFiles } from "@domain/BadgeHubFiles";
import { UploadedFile } from "@domain/UploadedFile";
import { DATA_DIR } from "@config";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ProjectSlug } from "@domain/readModels/app/Project";
import { VersionRevision } from "@domain/readModels/app/Version";

// We want to ensure here that the given pathparts are valid and do not cause the full path to be outside of the project+version's directory
// We cannot do this check in a higher layer because that would require knowledge of the file storage implementation.
const getAndCheckFullPath = (
  projectSlug: ProjectSlug,
  versionRevision: VersionRevision,
  pathParts: string[]
) => {
  const versionDir =
    typeof versionRevision === "number"
      ? `v${versionRevision}`
      : versionRevision;
  const resolvedVersionDir = path.resolve(DATA_DIR, projectSlug, versionDir);
  const fullPath = path.resolve(resolvedVersionDir, ...pathParts);

  if (!fullPath.startsWith(resolvedVersionDir + path.sep)) {
    console.error(
      "Malicious intent detected, path validity failed for arguments:",
      projectSlug,
      versionDir,
      fullPath
    );
    throw new Error(
      `Given path is invalid [${projectSlug}, ${versionDir}, ${pathParts.join("/")}], this request will be reported.`
    );
  }

  return fullPath;
};

export class NodeFSBadgeHubFiles implements BadgeHubFiles {
  async writeFile(
    projectSlug: ProjectSlug,
    versionRevision: VersionRevision,
    pathParts: string[],
    uploadedFile: UploadedFile
  ): Promise<void> {
    const fullPath = getAndCheckFullPath(
      projectSlug,
      versionRevision,
      pathParts
    );
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, uploadedFile.fileContent);
  }

  getFileContents(
    projectSlug: ProjectSlug,
    versionRevision: VersionRevision,
    pathParts: string[]
  ): Promise<Uint8Array> {
    return fs.readFile(
      getAndCheckFullPath(projectSlug, versionRevision, pathParts)
    );
  }
}
