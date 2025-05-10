import {
  Project,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/project/Project";
import {
  LatestOrDraftAlias,
  RevisionNumberOrAlias,
} from "@domain/readModels/project/Version";
import { User } from "@domain/readModels/project/User";
import { FileMetadata } from "@domain/readModels/project/FileMetadata";
import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/project/Category";
import { DBInsertUser } from "@db/models/project/DBUser";
import { DBProject } from "@db/models/project/DBProject";
import {
  DBAppMetadataJSON,
  DBInsertAppMetadataJSON,
} from "@db/models/project/DBAppMetadataJSON";
import { BadgeHubMetadata } from "@domain/BadgeHubMetadata";
import { BadgeHubFiles } from "@domain/BadgeHubFiles";
import { UploadedFile } from "@domain/UploadedFile";
import { DBDatedData } from "@db/models/project/DBDatedData";
import { calcSha256 } from "@util/digests";
import { TimestampTZ } from "@db/DBTypes";
import { CreateProjectProps } from "@domain/writeModels/project/WriteProject";

export class BadgeHubData {
  constructor(
    private badgeHubMetadata: BadgeHubMetadata,
    private badgeHubFiles: BadgeHubFiles
  ) {}

  insertUser(user: DBInsertUser): Promise<void> {
    return this.badgeHubMetadata.insertUser(user);
  }

  insertProject(
    project: CreateProjectProps,
    mockDates?: DBDatedData
  ): Promise<void> {
    return this.badgeHubMetadata.insertProject(project, mockDates);
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

  // Publishes the current state of the project as a version
  publishVersion(
    projectSlug: ProjectSlug,
    mockDate?: TimestampTZ
  ): Promise<void> {
    return this.badgeHubMetadata.publishVersion(projectSlug, mockDate);
  }

  getDraftProject(projectSlug: ProjectSlug): Promise<Project | undefined> {
    return this.badgeHubMetadata.getDraftProject(projectSlug);
  }

  getPublishedProject(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | Project> {
    return this.badgeHubMetadata.getPublishedProject(
      projectSlug,
      versionRevision
    );
  }

  getUser(userId: User["id"]): Promise<User> {
    return this.badgeHubMetadata.getUser(userId);
  }

  updateUser(updatedUser: User): Promise<void> {
    return this.badgeHubMetadata.updateUser(updatedUser);
  }

  async getFileContents(
    projectSlug: Project["slug"],
    versionRevision: RevisionNumberOrAlias,
    filePath: FileMetadata["name"]
  ): Promise<Uint8Array | undefined> {
    const fileMetadata = await this.getFileMetadata(
      projectSlug,
      versionRevision,
      filePath
    );
    if (!fileMetadata) {
      return undefined;
    }
    const sha256 = fileMetadata.sha256;
    return this.getFileContentsBySha256(sha256);
  }

  getFileContentsBySha256(sha265: string): Promise<Uint8Array | undefined> {
    return this.badgeHubFiles.getFileContents(sha265);
  }

  getVersionZipContents(
    projectSlug: Project["slug"],
    versionRevision: RevisionNumberOrAlias
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

  getProjects(
    filter: {
      pageStart?: number;
      pageLength?: number;
      badgeSlug?: Badge["slug"];
      categorySlug?: Category["slug"];
      userId?: User["id"];
    },
    revision: LatestOrDraftAlias
  ): Promise<ProjectWithoutVersion[]> {
    return this.badgeHubMetadata.getProjects(filter, revision);
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
    // TODO database management: project metadata in db should be updated with the metadata.json from the zip file
  }

  async updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>,
    mockDates?: DBDatedData
  ): Promise<void> {
    await this.badgeHubMetadata.updateDraftMetadata(
      slug,
      appMetadataChanges,
      mockDates
    );
    const updatedDraftVersion =
      await this.badgeHubMetadata.getDraftVersion(slug);
    if (!updatedDraftVersion) {
      throw new Error(`Draft version not found for slug: ${slug}`);
    }
    const updatedAppMetadata = updatedDraftVersion.app_metadata;
    const fileContent = new TextEncoder().encode(
      JSON.stringify(updatedAppMetadata)
    );
    // TODO handle inconsistency caused by case of code aborting at this point
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

  getFileMetadata(
    projectSlug: string,
    versionRevision: RevisionNumberOrAlias,
    filePath: string
  ): Promise<FileMetadata | undefined> {
    return this.badgeHubMetadata.getFileMetadata(
      projectSlug,
      versionRevision,
      filePath
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

  async deleteDraftFile(slug: string, filePath: string) {
    if (filePath === "metadata.json") {
      throw new Error(
        `[project: ${slug}] Cannot delete metadata.json because it is required.`
      );
    }
    await this.badgeHubMetadata.deleteDraftFile(slug, filePath);
  }
}
