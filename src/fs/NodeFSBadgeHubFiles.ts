import { BadgeHubFiles } from "@domain/BadgeHubFiles";
import { UploadedFile } from "@domain/UploadedFile";
import { DATA_DIR } from "@config";
import * as fs from "node:fs/promises";
import * as path from "node:path";
export class NodeFSBadgeHubFiles implements BadgeHubFiles {
  async writeFile(
    pathParts: string[],
    uploadedFile: UploadedFile
  ): Promise<void> {
    const fullPath = path.join(DATA_DIR, ...pathParts);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, uploadedFile.fileContent);
  }

  getFileContents(pathParts: string[]): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
}
