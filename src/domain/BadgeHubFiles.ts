import { UploadedFile } from "@domain/UploadedFile";
import { ProjectSlug } from "@domain/readModels/app/Project";
import { VersionRevision } from "@domain/readModels/app/Version";

export interface BadgeHubFiles {
  // Using path parts instead of a string to make it easier to work with paths in a cross-platform way
  writeFile(
    projectSlug: ProjectSlug,
    versionRevision: VersionRevision,
    pathParts: string[],
    uploadedFile: UploadedFile
  ): Promise<void>;

  getFileContents(
    projectSlug: ProjectSlug,
    versionRevision: VersionRevision,
    pathParts: string[]
  ): Promise<Uint8Array>;
}
