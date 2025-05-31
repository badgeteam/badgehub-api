import { initContract } from "@ts-rest/core";
import { z } from "zod/v3";
import { projectSchema } from "@shared/domain/readModels/project/Project";
import { categorySchema } from "@shared/domain/readModels/project/Category";
import { badgeSchema } from "@shared/domain/readModels/Badge";
import { notFoundSchema } from "@shared/contracts/httpResponseSchemas"; // TODO move domain to shared

const c = initContract();

export const publicProjectContracts = c.router({
  getProject: {
    method: "GET",
    path: `/projects/:slug`,
    pathParams: z.object({ slug: z.string() }),
    responses: {
      200: projectSchema,
      404: notFoundSchema,
    },
    summary: "Get Project Details by Slug",
  },
  getProjects: {
    method: "GET",
    path: `/projects`,
    query: z.object({
      pageStart: z.coerce.number().optional(),
      pageLength: z.coerce.number().optional(),
      device: z.string().optional(),
      category: z.string().optional(),
    }),
    responses: {
      200: z.array(projectSchema),
    },
    summary: "Get all Projects",
  },
  getProjectForRevision: {
    method: "GET",
    path: `/projects/:slug/rev:revision`,
    pathParams: z.object({
      slug: z.string(),
      revision: z.coerce.number(),
    }),
    responses: {
      200: projectSchema,
      404: notFoundSchema,
    },
    summary:
      "Get project details for a specific published revision of the project",
  },
});

export const publicFilesContracts = c.router({
  getLatestPublishedFile: {
    method: "GET",
    path: `/projects/:slug/latest/files/:filePath`,
    pathParams: z.object({
      slug: z.string(),
      filePath: z.string(),
    }),
    responses: {
      200: z.unknown().describe("File content as a stream"),
      404: notFoundSchema,
    },
    summary: "Get the latest published revision of a file in the project",
  },
  getFileForRevision: {
    method: "GET",
    path: `/projects/:slug/rev:revision/files/:filePath`,
    pathParams: z.object({
      slug: z.string(),
      revision: z.coerce.number(),
      filePath: z.string(),
    }),
    responses: {
      200: z.unknown().describe("File content as a stream"),
      404: notFoundSchema,
    },
    summary: "Get a file for a specific revision of the project",
  },
});

export const publicRestContracts = c.router({
  ...publicProjectContracts,
  ...publicFilesContracts,
  getCategories: {
    method: "GET",
    path: `/categories`,
    responses: {
      200: z.array(categorySchema).describe("List of categories"),
    },
  },
  getDevices: {
    method: "GET",
    path: `/devices`,
    responses: {
      200: z.array(badgeSchema).describe("List of badges (devices)"),
    },
  },
});
