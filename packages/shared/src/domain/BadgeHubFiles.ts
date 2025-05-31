import { UploadedFile } from "@shared/domain/UploadedFile";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";

export interface BadgeHubFiles {
  // Using path parts instead of a string to make it easier to work with paths in a cross-platform way
  writeFile(
    uploadedFile: UploadedFile,
    sha256: string,
    mockDates?: DBDatedData
  ): Promise<void>;

  getFileContents(sha256: string): Promise<Uint8Array | undefined>;
}
