import { initContract } from "@ts-rest/core";
import { z } from "zod/v3";
import {
  Project,
  ProjectWithoutVersion,
} from "@shared/domain/readModels/project/Project";
import {
  type Category,
  categorySlugSchema,
} from "@shared/domain/readModels/project/Category";
import { Badge, badgeSlugSchema } from "@shared/domain/readModels/Badge";

const c = initContract();

export const getProjectsQuerySchema = z.object({
  pageStart: z.coerce.number().optional(),
  pageLength: z.coerce.number().optional(),
  device: badgeSlugSchema.optional(),
  category: categorySlugSchema.optional(),
});

export const publicProjectContracts = c.router({
  getProject: {
    method: "GET",
    path: `/projects/:slug`,
    pathParams: z.object({ slug: z.string() }),
    responses: {
      200: c.type<Project>(),
      404: c.type<{ reason: string }>(),
    },
    summary: "Get Project Details by Slug",
  },
  getProjects: {
    method: "GET",
    path: `/projects`,
    query: getProjectsQuerySchema,
    responses: {
      200: c.type<ProjectWithoutVersion[]>(),
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
      200: c.type<Project>(),
      404: c.type<{ reason: string }>(),
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
      200: c.type<unknown>(), // ReadableStream
      404: c.type<{ reason: string }>(),
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
      200: c.type<unknown>(), // ReadableStream,
      404: c.type<{ reason: string }>(),
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
      200: c.type<Array<Category>>(),
    },
  },
  getBadges: {
    method: "GET",
    path: `/badges`,
    responses: {
      200: c.type<Badge[]>(),
    },
  },
});
