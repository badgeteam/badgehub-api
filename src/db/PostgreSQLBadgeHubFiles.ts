import { BadgeHubFiles } from "@domain/BadgeHubFiles";
import { UploadedFile } from "@domain/UploadedFile";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ProjectSlug } from "@domain/readModels/app/Project";
import { VersionRevision } from "@domain/readModels/app/Version";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import sql from "sql-template-tag";
import { calcSha256 } from "@util/digests";
import { DBDatedData } from "@db/models/app/DBDatedData";

// We want to ensure here that the given pathparts are valid and do not cause the full path to be outside of the project+version's directory
// We cannot do this check in a higher layer because that would require knowledge of the file storage implementation.
const getAndCheckFullPath = (
  projectSlug: ProjectSlug,
  versionRevision: VersionRevision,
  pathParts: string[]
) => {
  const versionDir =
    typeof versionRevision === "number"
      ? `v${versionRevision}`
      : versionRevision;
  const resolvedVersionDir = path.resolve(projectSlug, versionDir);
  const fullPath = path.resolve(resolvedVersionDir, ...pathParts);

  if (!fullPath.startsWith(resolvedVersionDir + path.sep)) {
    console.error(
      "Malicious intent detected, path validity failed for arguments:",
      projectSlug,
      versionDir,
      fullPath
    );
    throw new Error(
      `Given path is invalid [${projectSlug}, ${versionDir}, ${pathParts.join("/")}], this request will be reported.`
    );
  }

  return fullPath;
};

export class PostgreSQLBadgeHubFiles implements BadgeHubFiles {
  private readonly pool: Pool = getPool();

  async writeFile(
    uploadedFile: UploadedFile,
    sha256: string,
    dates?: DBDatedData
  ): Promise<void> {
    const results = await this.pool.query(
      sql`select 1 from file_data where sha256 = ${sha256}`
    );
    if (results.rows.length > 0) {
      return; // File already exists
    }
    await this.pool.query(
      sql`insert into file_data (sha256, content)
                values (${sha256}, ${uploadedFile.fileContent})`
    );
    if (dates) {
      await this.pool.query(sql`update file_data
                    set created_at = ${dates.created_at},
                        updated_at = ${dates.updated_at},
                        deleted_at = ${dates.deleted_at}
                    where sha256 = ${sha256}`);
    }
  }

  async getFileContents(sha256: string): Promise<Uint8Array | undefined> {
    const queryResult = await this.pool.query<{ content: Uint8Array }>(
      sql`select content from file_data where sha256 = ${sha256}`
    );
    return queryResult.rows[0]?.content;
  }
}
