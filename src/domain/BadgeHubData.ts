import {
  Project,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/app/Project";
import { Version } from "@domain/readModels/app/Version";
import { User } from "@domain/readModels/app/User";
import { FileMetadata } from "@domain/readModels/app/FileMetadata";
import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/app/Category";
import { DBInsertUser } from "@db/models/app/DBUser";
import { DBInsertProject, DBProject } from "@db/models/app/DBProject";
import {
  DBAppMetadataJSON,
  DBInsertAppMetadataJSON,
} from "@db/models/app/DBAppMetadataJSON";
import { BadgeHubMetadata } from "@domain/BadgeHubMetadata";
import { BadgeHubFiles } from "@domain/BadgeHubFiles";
import { UploadedFile } from "@domain/UploadedFile";
import { DBDatedData } from "@db/models/app/DBDatedData";
import { calcSha256 } from "@util/digests";

export class BadgeHubData {
  constructor(
    private badgeHubMetadata: BadgeHubMetadata,
    private badgeHubFiles: BadgeHubFiles
  ) {}

  insertUser(user: DBInsertUser): Promise<void> {
    return this.badgeHubMetadata.insertUser(user);
  }

  insertProject(project: DBInsertProject): Promise<void> {
    return this.badgeHubMetadata.insertProject(project);
  }

  updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<DBProject, "slug">>
  ): Promise<void> {
    return this.badgeHubMetadata.updateProject(projectSlug, changes);
  }

  deleteProject(projectSlug: ProjectSlug): Promise<void> {
    return this.badgeHubMetadata.deleteProject(projectSlug);
  }

  // Publishes the current state of the app as a version
  publishVersion(projectSlug: ProjectSlug): Promise<void> {
    // TODO file management: move files from draft to latest and save all files by hash as well
    return this.badgeHubMetadata.publishVersion(projectSlug);
  }

  getProject(projectSlug: ProjectSlug): Promise<Project> {
    return this.badgeHubMetadata.getProject(projectSlug);
  }

  getDraftVersion(projectSlug: ProjectSlug): Promise<Version> {
    return this.badgeHubMetadata.getDraftVersion(projectSlug);
  }

  getUser(userId: User["id"]): Promise<User> {
    return this.badgeHubMetadata.getUser(userId);
  }

  updateUser(updatedUser: User): Promise<void> {
    return this.badgeHubMetadata.updateUser(updatedUser);
  }

  async getFileContents(
    projectSlug: Project["slug"],
    versionRevision: number | "draft" | "latest",
    filePath: FileMetadata["name"]
  ): Promise<Uint8Array | undefined> {
    const fileMetadata = await this.getFileMetadata(
      projectSlug,
      versionRevision,
      filePath
    );
    const sha256 = fileMetadata.sha256;
    return this.getFileContentsBySha256(sha256);
  }

  getFileContentsBySha256(sha265: string): Promise<Uint8Array | undefined> {
    return this.badgeHubFiles.getFileContents(sha265);
  }

  getVersionZipContents(
    projectSlug: Project["slug"],
    versionRevision: number | "draft" | "latest"
  ): Promise<Uint8Array> {
    // TODO here we should get the file path from the DB in order to fetch the correct file
    throw new Error("Method not implemented.");
  }

  getBadges(): Promise<Badge[]> {
    return this.badgeHubMetadata.getBadges();
  }

  getCategories(): Promise<Category[]> {
    return this.badgeHubMetadata.getCategories();
  }

  getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: Badge["slug"];
    categorySlug?: Category["slug"];
  }): Promise<ProjectWithoutVersion[]> {
    return this.badgeHubMetadata.getProjects(filter);
  }

  async writeDraftFile(
    projectSlug: ProjectSlug,
    filePath: string,
    uploadedFile: UploadedFile,
    mockDates?: DBDatedData
  ): Promise<void> {
    await this._writeDraftFile(
      projectSlug,
      filePath.split("/"),
      uploadedFile,
      mockDates
    );
    if (filePath === "metadata.json") {
      const appMetadata: DBAppMetadataJSON = JSON.parse(
        new TextDecoder().decode(uploadedFile.fileContent)
      );
      await this.badgeHubMetadata.updateDraftMetadata(
        projectSlug,
        appMetadata,
        mockDates
      );
    }
  }

  async writeDraftProjectZip(projectSlug: string, zipContent: Uint8Array) {
    throw new Error("Method not implemented.");
    // TODO when implementing file management, we should still decide whether we want to delete here, then get all files and save them with updateDraftFile, or better let the file management handle this more.
    // TODO database management: app metadata in db should be updated with the metadata.json from the zip file
  }

  async updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>,
    mockDates?: DBDatedData
  ): Promise<void> {
    await this.badgeHubMetadata.updateDraftMetadata(slug, appMetadataChanges);
    const updatedDraftVersion =
      await this.badgeHubMetadata.getDraftVersion(slug);
    const updatedAppMetadata = updatedDraftVersion.app_metadata;
    const fileContent = new TextEncoder().encode(
      JSON.stringify(updatedAppMetadata)
    );
    await this._writeDraftFile(
      slug,
      ["metadata.json"],
      {
        mimetype: "application/json",
        fileContent,
        directory: undefined,
        fileName: undefined,
        size: fileContent.length,
      },
      mockDates
    );
  }

  private async _writeDraftFile(
    slug: string,
    pathParts: string[],
    uploadedFile: UploadedFile,
    mockDates?: DBDatedData
  ) {
    const sha256 = await calcSha256(uploadedFile);
    await this.badgeHubFiles.writeFile(uploadedFile, sha256, mockDates);
    await this.badgeHubMetadata.writeDraftFileMetadata(
      slug,
      pathParts,
      uploadedFile,
      sha256,
      mockDates
    );
  }

  getFileMetadata(
    projectSlug: string,
    versionRevision: number | "draft" | "latest",
    filePath: string
  ): Promise<FileMetadata> {
    return this.badgeHubMetadata.getFileMetadata(
      projectSlug,
      versionRevision,
      filePath
    );
  }
}
