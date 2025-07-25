import {
  ProjectDetails,
  ProjectSlug,
  ProjectSummary,
} from "@shared/domain/readModels/project/ProjectDetails";
import {
  LatestOrDraftAlias,
  RevisionNumberOrAlias,
} from "@shared/domain/readModels/project/Version";
import { User } from "@shared/domain/readModels/project/User";
import { FileMetadata } from "@shared/domain/readModels/project/FileMetadata";
import { BadgeSlug } from "@shared/domain/readModels/Badge";
import { CategoryName } from "@shared/domain/readModels/project/Category";
import { DBProject } from "@shared/dbModels/project/DBProject";
import { BadgeHubMetadata } from "@shared/domain/BadgeHubMetadata";
import { BadgeHubFiles } from "@shared/domain/BadgeHubFiles";
import { UploadedFile } from "@shared/domain/UploadedFile";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { calcSha256 } from "@util/sha256";
import { TimestampTZ } from "@shared/dbModels/DBTypes";
import { CreateProjectProps } from "@shared/domain/writeModels/project/WriteProject";
import { WriteAppMetadataJSON } from "@shared/domain/writeModels/AppMetadataJSON";
import { LRUCache } from "lru-cache";

type FileContext =
  | { projectSlug: string; revision: number; filePath: string }
  | { sha256: string };

export class BadgeHubData {
  private immutableFileCache: LRUCache<
    string,
    Uint8Array<ArrayBufferLike>,
    FileContext
  >;

  constructor(
    private badgeHubMetadata: BadgeHubMetadata,
    private badgeHubFiles: BadgeHubFiles
  ) {
    const fileCacheOptions: LRUCache.Options<string, Uint8Array, FileContext> =
      {
        max: 1000,
        // for use with tracking overall storage size
        maxSize: 500_000_000, // 500MB
        sizeCalculation: (value, key) => {
          return value.length;
        },
        // how long to live in ms
        ttl: 60_000 * 60 * 12, // 12 hours

        // async method to use for cache.fetch(), for
        // stale-while-revalidate type of behavior
        fetchMethod: async (_key, _staleValue, { context }) => {
          if ("sha256" in context) {
            return this.badgeHubFiles.getFileContents(context.sha256);
          }
          return this._getFileContents(
            context.projectSlug,
            context.revision,
            context.filePath
          );
        },
      };

    this.immutableFileCache = new LRUCache(fileCacheOptions);
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

  getProject(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | ProjectDetails> {
    return this.badgeHubMetadata.getProject(projectSlug, versionRevision);
  }

  async getFileContents(
    projectSlug: ProjectDetails["slug"],
    versionRevision: RevisionNumberOrAlias,
    filePath: FileMetadata["name"]
  ): Promise<Uint8Array | undefined> {
    if (typeof versionRevision === "number") {
      return this.immutableFileCache.fetch(
        projectSlug + "_rev" + versionRevision + ":" + filePath,
        {
          context: {
            projectSlug,
            revision: versionRevision,
            filePath,
          },
        }
      );
    }
    return await this._getFileContents(projectSlug, versionRevision, filePath);
  }

  private async _getFileContents(
    projectSlug: string,
    versionRevision: RevisionNumberOrAlias,
    filePath: string
  ) {
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

  getFileContentsBySha256(sha256: string): Promise<Uint8Array | undefined> {
    return this.immutableFileCache.fetch(sha256, {
      context: { sha256 },
    });
  }

  getVersionZipContents(
    projectSlug: ProjectDetails["slug"],
    versionRevision: RevisionNumberOrAlias
  ): Promise<Uint8Array> {
    // TODO here we should get the file path from the DB in order to fetch the correct file
    throw new Error("Method not implemented.");
  }

  getBadges(): Promise<BadgeSlug[]> {
    return this.badgeHubMetadata.getBadges();
  }

  getCategories(): Promise<CategoryName[]> {
    return this.badgeHubMetadata.getCategories();
  }

  getProjectSummaries(
    filter: {
      pageStart?: number;
      pageLength?: number;
      badge?: BadgeSlug;
      category?: CategoryName;
      userId?: User["idp_user_id"];
    },
    revision: LatestOrDraftAlias
  ): Promise<ProjectSummary[]> {
    return this.badgeHubMetadata.getProjectSummaries(filter, revision);
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
      const appMetadata: WriteAppMetadataJSON = JSON.parse(
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
    newAppMetadata: WriteAppMetadataJSON,
    mockDates?: DBDatedData
  ): Promise<void> {
    await this.badgeHubMetadata.updateDraftMetadata(
      slug,
      newAppMetadata,
      mockDates
    );
    const fileContent = new TextEncoder().encode(
      JSON.stringify(newAppMetadata)
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
