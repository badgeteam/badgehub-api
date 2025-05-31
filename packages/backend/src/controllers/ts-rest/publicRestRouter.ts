import { initServer } from "@ts-rest/express";
import {
  publicFilesContracts,
  publicProjectContracts,
  publicRestContracts,
} from "@shared/contracts/publicRestContracts";
import { BadgeHubData } from "@shared/domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import { nok, ok } from "@controllers/ts-rest/httpResponses";
import { Readable } from "node:stream";
import { RouterImplementation } from "@ts-rest/express/src/lib/types";

const createFilesRouter = (badgeHubData: BadgeHubData) => {
  const filesRouter: RouterImplementation<typeof publicFilesContracts> = {
    getLatestPublishedFile: async ({ params: { slug, filePath }, res }) => {
      const file = await badgeHubData.getFileContents(slug, "latest", filePath);
      if (!file) {
        return nok(404, `No app with slug '${slug}' found`);
      }
      const data = Readable.from(file);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filePath}"`
      );
      return ok(data);
    },
    getFileForRevision: async ({
      params: { slug, revision, filePath },
      res,
    }) => {
      const file = await badgeHubData.getFileContents(slug, revision, filePath);
      if (!file) {
        return nok(
          404,
          `No app with slug '${slug}' and revision '${revision}' found`
        );
      }
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filePath}"`
      );
      const data = Readable.from(file);
      return ok(data);
    },
  };
  return filesRouter;
};

const createProjectRouter = (badgeHubData: BadgeHubData) => {
  const projectRouter: RouterImplementation<typeof publicProjectContracts> = {
    getProject: async ({ params: { slug } }) => {
      const details = await badgeHubData.getProject(slug, "latest");
      if (!details) {
        return nok(404, `No public app with slug '${slug}' found`);
      }
      return ok(details);
    },
    getProjects: async ({
      query: { pageStart, pageLength, device, category },
    }) => {
      console.log("HIIIII JOSSSSS");
      const data = await badgeHubData.getProjects(
        {
          pageStart,
          pageLength,
          badgeSlug: device,
          categorySlug: category,
        },
        "latest"
      );
      return ok(data);
    },
    getProjectForRevision: async ({ params: { slug, revision } }) => {
      const details = await badgeHubData.getProject(slug, revision);
      if (!details) {
        return nok(
          404,
          `No public app with slug [${slug}] and revision [${revision}] found`
        );
      }
      return ok(details);
    },
  };
  return projectRouter;
};

export const createPublicRestRouter = (
  badgeHubData: BadgeHubData = new BadgeHubData(
    new PostgreSQLBadgeHubMetadata(),
    new PostgreSQLBadgeHubFiles()
  )
) => {
  const s = initServer();
  return s.router(publicRestContracts, {
    ...createProjectRouter(badgeHubData),
    ...createFilesRouter(badgeHubData),
    getCategories: async () => {
      const data = await badgeHubData.getCategories();
      return ok(data);
    },
    getDevices: async () => {
      const data = await badgeHubData.getBadges();
      return ok(data);
    },
  });
};
