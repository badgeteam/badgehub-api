import { ProjectWithoutVersion } from "@domain/readModels/project/Project";
import moment from "moment";
import { DBProject } from "@db/models/project/DBProject";
import { DBVersion } from "@db/models/project/DBVersion";
import { DBAppMetadataJSON as DBMetadataFileContents } from "@db/models/project/DBAppMetadataJSON";
import { DBUser } from "@db/models/project/DBUser";
import sql from "sql-template-tag";
import { extractDatedDataConverted } from "@db/sqlHelpers/dbDates";
import { Category } from "@domain/readModels/project/Category";

export function getBaseSelectProjectQuery(
  revision: LatestOrDraftAlias = "latest"
) {
  return sql`select p.slug,
                      p.git,
                      p.allow_team_fixes,
                      p.user_id,
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
                      u.name as author_name
               from projects p
                        left join users u on p.user_id = u.id and u.deleted_at is null
                        left join versions v on ${revision === "draft" ? sql`p.draft_revision` : sql`p.latest_revision`} = v.revision and p.slug = v.project_slug
                        left join app_metadata_jsons m on v.app_metadata_json_id = m.id
                        left join categories c on m.category = c.name
    `;
}

export const projectQueryResponseToReadModel = (
  enrichedDBProject: ProjectQueryResponse
): ProjectWithoutVersion => {
  return {
    allow_team_fixes: false,
    user_id: enrichedDBProject.user_id,
    user_name: enrichedDBProject.author_name, // todo maybe change to email, full id or object with multiple fields
    category: enrichedDBProject.category || "Uncategorised",
    collaborators: [], // TODO
    description: enrichedDBProject.description,
    download_counter: undefined, // TODO
    git: enrichedDBProject.git,
    git_commit_id: enrichedDBProject.git_commit_id,
    interpreter: enrichedDBProject.interpreter,
    license: enrichedDBProject.license_file, // TODO check what we should do with the license, possibly we could say that this is either a path or 'MIT'|..., but then still we should read out the licens somewhere if it is a file.
    name: enrichedDBProject.name,
    published_at: moment(enrichedDBProject.published_at).toDate(),
    revision: enrichedDBProject.revision,
    size_of_content: undefined, // TODO
    size_of_zip: enrichedDBProject.size_of_zip,
    slug: enrichedDBProject.slug,
    states: undefined,
    status: undefined, // TODO
    dependencies: undefined, // TODO
    votes: undefined, // TODO
    warnings: undefined, // TODO
    ...extractDatedDataConverted(enrichedDBProject),
  };
};
export type ProjectQueryResponse = DBProject &
  DBVersion &
  DBMetadataFileContents & {
    author_name: DBUser["name"];
    category_slug: Category["slug"];
  };
