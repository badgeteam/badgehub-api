import { ProjectSummary } from "@shared/domain/readModels/project/ProjectDetails";
import moment from "moment";
import { DBProject } from "@shared/dbModels/project/DBProject";
import { DBVersion } from "@shared/dbModels/project/DBVersion";
import sql, { raw } from "sql-template-tag";
import { extractDatedDataConverted } from "@db/sqlHelpers/dbDates";
import { LatestOrDraftAlias } from "@shared/domain/readModels/project/Version";

export function getBaseSelectProjectQuery(
  revision: LatestOrDraftAlias = "latest"
) {
  const revision_column =
    revision === "draft" ? raw(`p.draft_revision`) : raw(`p.latest_revision`);
  return sql`select p.slug,
                    p.git,
                    p.idp_user_id,
                    p.created_at,
                    p.updated_at,
                    p.deleted_at,
                    v.published_at,
                    v.revision,
                    v.size_of_zip,
                    v.app_metadata
             from projects p
                    left join versions v on ${revision_column} = v.revision and p.slug = v.project_slug`;
}

export const projectQueryResponseToReadModel = (
  enrichedDBProject: ProjectQueryResponse
): ProjectSummary => {
  const appMetadata = enrichedDBProject.app_metadata;
  return {
    idp_user_id: enrichedDBProject.idp_user_id,
    categories: appMetadata.categories,
    description: appMetadata.description,
    // download_counter: undefined, // TODO
    git: enrichedDBProject.git,
    license_type: appMetadata.license_type,
    name: appMetadata.name ?? enrichedDBProject.slug,
    published_at: moment(enrichedDBProject.published_at).toDate(),
    revision: enrichedDBProject.revision,
    slug: enrichedDBProject.slug,
    // states: undefined,
    // status: undefined, // TODO
    // dependencies: undefined, // TODO
    // votes: undefined, // TODO
    // warnings: undefined, // TODO
    icon_map: appMetadata.icon_map,
    badges: appMetadata.badges,
  };
};

export type ProjectQueryResponse = DBProject & DBVersion;
