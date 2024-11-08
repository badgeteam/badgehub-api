import { ProjectPort } from "@domain/aggregates/ProjectPort";
import { Badge } from "@domain/models/Badge";
import { MetadataFileContents } from "@domain/models/app/MetadataFileContents";
import { Project, ProjectSlug } from "@domain/models/app/Project";
import { User } from "@domain/models/app/User";
import { Version } from "@domain/models/app/Version";
import { AppCategoryName } from "./newModels/app/MetadataFileContents";

export class ProjectPostgresAdapter implements ProjectPort {
  getCategories(): Promise<AppCategoryName[]> {
    throw new Error("Method not implemented.");
  }
  createProject(projectSlug: ProjectSlug): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteProject(projectSlug: ProjectSlug): Promise<void> {
    throw new Error("Method not implemented.");
  }
  publishUpdatedMetadata(changes: MetadataFileContents): Promise<void> {
    throw new Error("Method not implemented.");
  }

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  publishVersion(projectSlug: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getProject(projectSlug: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
  getVersion(projectSlug: string): Promise<Version> {
    throw new Error("Method not implemented.");
  }
  getUser(userId: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUser(updatedUser: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getFileDownloadLink(fileId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getVersionDownloadLink(versionId: number): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getBadges(): Promise<Badge> {
    throw new Error("Method not implemented.");
  }
  getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: string;
    appCategory?: AppCategoryName;
  }): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
