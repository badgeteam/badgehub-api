import { initContract } from "@ts-rest/core";
import { z } from "zod/v3";
import {
  projectSchema,
  ProjectWithoutVersion,
} from "@shared/domain/readModels/project/Project";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";
import {
  CreateProjectProps,
  createProjectPropsSchema,
} from "@shared/domain/writeModels/project/WriteProject";
import { writeAppMetadataJSONSchema } from "@shared/domain/writeModels/AppMetadataJSON";

const c = initContract();

// Schemas for private endpoints.
// Replace these with more specific schemas from your domain if available.
const createProjectBodySchema = createProjectPropsSchema
  .omit({ slug: true, idp_user_id: true })
  .describe("Schema request body for creating or updating a project");
type CreateProjectBody = Omit<CreateProjectProps, "slug" | "idp_user_id">;
type Checks = [
  CheckSame<
    CreateProjectBody,
    CreateProjectBody,
    z.infer<typeof createProjectBodySchema>
  >,
];

const appMetadataPartialSchema = writeAppMetadataJSONSchema.partial();

const privateProjectContracts = c.router(
  {
    createProject: {
      method: "POST",
      path: "/projects/:slug",
      pathParams: z.object({ slug: z.string() }),
      body: createProjectBodySchema,
      responses: {
        204: c.type<void>(),
        409: c.type<{ reason: string }>(),
        403: c.type<{ reason: string }>(),
      },
      summary: "Create a new project",
    },

    updateProject: {
      method: "PATCH",
      path: "/projects/:slug",
      pathParams: z.object({ slug: z.string() }),
      body: createProjectBodySchema,
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Update an existing project",
    },

    deleteProject: {
      method: "DELETE",
      path: "/projects/:slug",
      pathParams: z.object({ slug: z.string() }),
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Delete an existing project",
    },

    writeDraftFile: {
      method: "POST",
      path: "/projects/:slug/draft/files/:filePath",
      contentType: "multipart/form-data",
      body: z.any(),
      pathParams: z.object({
        slug: z.string(),
        filePath: z.string(),
      }),
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Upload a file to the latest draft version of a project",
    },

    deleteDraftFile: {
      method: "DELETE",
      path: "/projects/:slug/draft/files/:filePath",
      pathParams: z.object({
        slug: z.string(),
        filePath: z.string(),
      }),
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Delete a file from the latest draft version of a project",
    },

    changeDraftAppMetadata: {
      method: "PATCH",
      path: "/projects/:slug/draft/metadata",
      pathParams: z.object({ slug: z.string() }),
      body: appMetadataPartialSchema,
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Change the metadata of the latest draft version of a project",
    },

    getDraftFile: {
      method: "GET",
      path: "/projects/:slug/draft/files/:filePath",
      pathParams: z.object({
        slug: z.string(),
        filePath: z.string(),
      }),
      responses: {
        200: z.unknown().describe("File content as a stream"),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Get a file from the draft version of a project",
    },

    getDraftProject: {
      method: "GET",
      path: "/projects/:slug/draft",
      pathParams: z.object({ slug: z.string() }),
      responses: {
        200: projectSchema,
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      summary: "Get project details for the draft version of a project",
    },

    publishVersion: {
      method: "PATCH",
      path: "/projects/:slug/publish",
      pathParams: z.object({ slug: z.string() }),
      responses: {
        204: z.void(),
        403: c.type<{ reason: string }>(),
        404: c.type<{ reason: string }>(),
      },
      body: z.unknown().optional().nullable(),
      summary: "Publish the current draft as a new version",
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  }
);

const privateRestContracts = c.router(
  {
    ...privateProjectContracts,
    testPrivateEndpoint: {
      method: "GET",
      path: "/test/private",
      responses: {
        200: z.string().describe("A test response to verify authentication"),
      },
    },
    getUserDraftProjects: {
      method: "GET",
      path: "/users/:userId/drafts",
      pathParams: z.object({ userId: z.string() }),
      query: z.object({
        pageStart: z.coerce.number().optional(),
        pageLength: z.coerce.number().optional(),
      }),
      responses: {
        200: c.type<ProjectWithoutVersion[]>(),
        403: c.type<{ reason: string }>(),
      },
      summary: "Get all draft projects for a user",
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  }
);

export { privateProjectContracts, privateRestContracts };
