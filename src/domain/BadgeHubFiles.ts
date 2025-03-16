import { UploadedFile } from "@domain/UploadedFile";
import { ProjectSlug } from "@domain/readModels/app/Project";
import { VersionRevision } from "@domain/readModels/app/Version";
import { DBDatedData } from "@db/models/app/DBDatedData";

export interface BadgeHubFiles {
  // Using path parts instead of a string to make it easier to work with paths in a cross-platform way
  writeFile(
    uploadedFile: UploadedFile,
    sha256: string,
    mockDates?: DBDatedData
  ): Promise<void>;

  getFileContents(sha256: string): Promise<Uint8Array | undefined>;
}
