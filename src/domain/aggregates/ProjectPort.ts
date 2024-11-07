import { MetadataFileContents } from "../models/app/MetadataFileContents";
import { Project } from "@domain/models/app/Project";
import { Version } from "@domain/models/app/Version";
type AppSlug = string;

interface ProjectPort {
  publishUpdatedMetadata(changes: MetadataFileContents): Promise<void>;
  updateFile(filePath: string, contents: string): Promise<void>;
  publishVersion(slug: AppSlug): Promise<void>; // Publishes the current state of the app as a version
  getAppProject(slug: AppSlug): Promise<Project>;
  getAppVersion(slug: AppSlug): Promise<Version>;
}
