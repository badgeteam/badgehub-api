import { BadgeHubFiles } from "@domain/BadgeHubFiles";

export class NodeFSBadgeHubFiles implements BadgeHubFiles {
  writeFile(pathParts: string[], content: Uint8Array): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getFileContents(pathParts: string[]): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
}
