import { Project } from "@domain/models/app/Project";
import { Version } from "@domain/models/app/Version";
import { User } from "@domain/models/app/User";
import { FileMetadata } from "@domain/models/app/FileMetadata";
import { MetadataFileContents } from "@domain/models/app/MetadataFileContents";
import { ProjectSlug } from "@domain/models/app/Project";

interface ProjectPort {
  publishUpdatedMetadata(changes: MetadataFileContents): Promise<void>;
  updateFile(filePath: string, contents: string): Promise<void>;
  publishVersion(slug: ProjectSlug): Promise<void>; // Publishes the current state of the app as a version
  getAppProject(slug: ProjectSlug): Promise<Project>;
  getAppVersion(slug: ProjectSlug): Promise<Version>;
  getUser(userId: User["id"]): Promise<User>;
  updateUser(updatedUser: User): Promise<void>;
  getFileDownloadLink(fileId: FileMetadata["id"]): Promise<string>;
  getVersionDownloadLink(versionId: Version["id"]): Promise<string>;
}
