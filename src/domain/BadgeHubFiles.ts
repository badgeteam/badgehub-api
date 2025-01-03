import { UploadedFile } from "@domain/UploadedFile";

export interface BadgeHubFiles {
  // Using path parts instead of a string to make it easier to work with paths in a cross-platform way
  writeFile(pathParts: string[], uploadedFile: UploadedFile): Promise<void>;

  getFileContents(pathParts: string[]): Promise<Uint8Array>;
}
