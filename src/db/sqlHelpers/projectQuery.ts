import { Project } from "@domain/readModels/app/Project";
import moment from "moment/moment";
import { DBProject } from "@db/models/app/DBProject";
import { DBVersion } from "@db/models/app/DBVersion";
import { DBAppMetadataJSON as DBMetadataFileContents } from "@db/models/app/DBAppMetadataJSON";
import { DBUser } from "@db/models/app/DBUser";
import sql from "sql-template-tag";
import { dateStringsToDates } from "@db/sqlHelpers/dbDates";

export function getBaseSelectProjectQuery() {
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
                           m.description,
                           m.interpreter,
                           m.license_file,
                           m.name,
                           u.name as author_name
                    from projects p
                             left join users u on p.user_id = u.id
                             left join versions v on p.version_id = v.id
                             left join app_metadata_jsons m on v.app_metadata_json_id = m.id
                    where
                      and u.deleted_at is null
                      and v.deleted_at is null
    `;
}

export const projectQueryResponseToReadModel = (
  dbProject: ProjectQueryResponse
): Project => {
  return {
    version: undefined, // TODO
    allow_team_fixes: false,
    user_id: dbProject.user_id,
    author: dbProject.author_name, // todo maybe change to email, full id or object with multiple fields
    badges: [], // TODO
    category: dbProject.category || "Uncategorised",
    collaborators: [], // TODO
    description: dbProject.description,
    download_counter: undefined, // TODO
    git: dbProject.git,
    git_commit_id: dbProject.git_commit_id,
    interpreter: dbProject.interpreter,
    license: dbProject.license_file, // TODO check what we should do with the license, possibly we could say that this is either a path or 'MIT'|..., but then still we should read out the licens somewhere if it is a file.
    name: dbProject.name,
    published_at: moment(dbProject.published_at).toDate(),
    revision: dbProject.revision,
    size_of_content: undefined, // TODO
    size_of_zip: dbProject.size_of_zip,
    slug: dbProject.slug,
    states: undefined,
    status: undefined, // TODO
    versions: undefined, // TODO
    dependencies: undefined, // TODO
    votes: undefined, // TODO
    warnings: undefined, // TODO
    ...dateStringsToDates(dbProject),
  };
};
export type ProjectQueryResponse = DBProject &
  DBVersion &
  DBMetadataFileContents & {
    author_name: DBUser["name"];
  };
