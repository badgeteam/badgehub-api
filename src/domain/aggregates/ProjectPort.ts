import { Project } from "../models/app/badgehub/Project";
import { AppMetadata } from "../models/app/MetadataFileContents";
import { Version } from "../models/app/badgehub/Version";
type AppSlug = string;

interface ProjectPort {
  publishUpdatedMetadata(changes: AppMetadata): Promise<void>;
  updateFile(filePath: string, contents: string): Promise<void>;
  publishVersion(slug: AppSlug): Promise<void>; // Publishes the current state of the app as a version
  getAppProject(slug: AppSlug): Promise<Project>;
  getAppVersion(slug: AppSlug): Promise<Version>;
}
