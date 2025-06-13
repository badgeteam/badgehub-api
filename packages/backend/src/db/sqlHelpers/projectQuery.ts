import { ProjectWithoutVersion } from "@shared/domain/readModels/project/Project";
import moment from "moment";
import { DBProject } from "@shared/dbModels/project/DBProject";
import { DBVersion } from "@shared/dbModels/project/DBVersion";
import { DBAppMetadataJSON as DBMetadataFileContents } from "@shared/dbModels/project/DBAppMetadataJSON";
import sql from "sql-template-tag";
import { extractDatedDataConverted } from "@db/sqlHelpers/dbDates";
import { Category } from "@shared/domain/readModels/project/Category";
import { LatestOrDraftAlias } from "@shared/domain/readModels/project/Version";

export function getBaseSelectProjectQuery(
  revision: LatestOrDraftAlias = "latest"
) {
  return sql`select p.slug,
                    p.git,
                    p.allow_team_fixes,
                    p.idp_user_id,
                    p.created_at,
                    p.updated_at,
                    p.deleted_at,
                    v.semantic_version,
                    v.git_commit_id,
                    v.published_at,
                    v.revision,
                    v.size_of_zip,
                    m.category,
                    m.description,
                    m.interpreter,
                    m.license_file,
                    m.name,
                    m.icon
             from projects p
                    left join versions v on ${revision === "draft" ? sql`p.draft_revision` : sql`p.latest_revision`} = v.revision and p.slug = v.project_slug
                    left join app_metadata_jsons m on v.app_metadata_json_id = m.id
                    left join categories c on m.category = c.name
  `; // TODO extract revision === "draft" ? sql`p.draft_revision` : sql`p.latest_revision` to revision_column
}

export const projectQueryResponseToReadModel = (
  enrichedDBProject: ProjectQueryResponse
): ProjectWithoutVersion => {
  return {
    allow_team_fixes: false,
    idp_user_id: enrichedDBProject.idp_user_id,
    category: enrichedDBProject.category || "Uncategorised",
    // collaborators: [], // TODO
    description: enrichedDBProject.description ?? null,
    // download_counter: undefined, // TODO
    git: enrichedDBProject.git ?? null,
    git_commit_id: enrichedDBProject.git_commit_id ?? null,
    interpreter: enrichedDBProject.interpreter ?? null,
    license: enrichedDBProject.license_file ?? null, // TODO check what we should do with the license, possibly we could say that this is either a path or 'MIT'|..., but then still we should read out the licens somewhere if it is a file..
    name: enrichedDBProject.name ?? enrichedDBProject.slug,
    published_at: moment(enrichedDBProject.published_at).toDate(),
    revision: enrichedDBProject.revision,
    // size_of_content: undefined, // TODO
    // size_of_zip: enrichedDBProject.size_of_zip, // TODO
    slug: enrichedDBProject.slug,
    // states: undefined,
    // status: undefined, // TODO
    // dependencies: undefined, // TODO
    // votes: undefined, // TODO
    // warnings: undefined, // TODO
    icon: enrichedDBProject.icon ?? null,
    badges: [], // TODO
    // min_firmware: null, // TODO: this should be the smallest revision number that exists, but we don't have this in the query
    // max_firmware: null, // TODO: this should be the smallest revision number that exists, but we don't have this in the query
    ...extractDatedDataConverted(enrichedDBProject),
  };
};
export type ProjectQueryResponse = DBProject &
  DBVersion &
  DBMetadataFileContents & {
    category_slug: Category["slug"];
  };
