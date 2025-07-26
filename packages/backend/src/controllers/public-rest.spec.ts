import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import {
  ProjectDetails,
  ProjectSummary,
} from "@shared/domain/readModels/project/ProjectDetails";
import { isInDebugMode } from "@util/debug";
import { AppMetadataJSON } from "@shared/domain/readModels/project/AppMetadataJSON";

describe(
  "Public API Routes",
  () => {
    let app: ReturnType<typeof express>;
    beforeEach(() => {
      app = createExpressServer();
    });

    test("GET /api/v3/badges", async () => {
      const res = await request(app).get("/api/v3/badges");
      expect(res.statusCode).toBe(200);
      expect(res.body).toContain("why2025");
    });

    test("GET /api/v3/projects", async () => {
      const res = await request(app).get("/api/v3/projects");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.find((app: ProjectSummary) => app.name === "PixelPulse")
      ).toBeDefined();
      expect(res.body.find((app: ProjectSummary) => app.slug === "codecraft"))
        .toMatchInlineSnapshot(`
        {
          "badges": [
            "mch2022",
            "why2025",
          ],
          "categories": [
            "Event related",
            "Games",
          ],
          "description": "With CodeCraft, you can do interesting things with the sensors.",
          "git": null,
          "icon_map": {
            "64x64": "icon5.png",
          },
          "idp_user_id": "CyberSherpa",
          "license_type": "MIT",
          "name": "CodeCraft",
          "published_at": "2024-05-23T14:01:16.975Z",
          "revision": 0,
          "slug": "codecraft",
        }
      `);
    });

    test("GET /api/v3/projects should not contain unpublished apps", async () => {
      const res = await request(app).get("/api/v3/projects");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.find((app: ProjectSummary) => !app.published_at)?.name
      ).toBeUndefined();
    });

    test("GET /api/v3/projects with device filter", async () => {
      const res = await request(app).get("/api/v3/projects?badge=why2025");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.every((app: ProjectSummary) => app.badges?.includes("why2025"))
      ).toBe(true);
      expect(
        res.body.find((app: ProjectSummary) => app.slug === "codecraft")
      ).toBeDefined();
    });

    test("GET /api/v3/projects with category filter", async () => {
      const res = await request(app).get("/api/v3/projects?category=Silly");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(
        res.body.every((app: ProjectSummary) =>
          app.categories?.includes("Silly")
        )
      ).toBe(true);
      expect(
        res.body.find((app: ProjectSummary) =>
          app.categories?.includes("Silly")
        )
      ).toBeDefined();
    });

    test("GET /api/v3/projects with search query filter searching for name", async () => {
      const res = await request(app).get("/api/v3/projects?search=oDecrafTE");
      expect(res.statusCode).toBe(200);
      const result: ProjectSummary[] = res.body;
      expect(result.length).toBe(1);
      expect(result[0]!.slug).toEqual("codecrafter");
    });

    test("GET /api/v3/projects with search query filter searching for description", async () => {
      const res = await request(app).get(
        "/api/v3/projects?search=" + encodeURIComponent("interesting things")
      );
      expect(res.statusCode).toBe(200);
      const result: ProjectSummary[] = res.body;
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(
        result.every((app: ProjectSummary) =>
          app.description?.includes("interesting things")
        )
      ).toBe(true);
    });

    test("GET /api/v3/projects with device and category filters", async () => {
      const res = await request(app).get(
        "/api/v3/projects?badge=troopers23&category=Silly"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(
        res.body.every(
          (app: ProjectSummary) =>
            app.badges?.includes("troopers23") &&
            app.categories?.includes("Silly")
        )
      ).toBe(true);
      expect(
        res.body.find((app: ProjectSummary) =>
          app.categories?.includes("Silly")
        )
      ).toBeDefined();
    });

    test("GET /api/v3/projects/non-existent should return 404", async () => {
      const res = await request(app).get("/api/v3/projects/non-existent");
      expect(res.statusCode).toBe(404);
    });

    test("GET /api/v3/projects/codecraft", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft");
      expect(res.statusCode).toBe(200);

      const project = res.body as ProjectDetails;

      const { version, ...restProject } = project;
      expect(restProject).toMatchInlineSnapshot(`
        {
          "created_at": "2024-05-22T14:01:16.975Z",
          "draft_revision": 1,
          "git": null,
          "idp_user_id": "CyberSherpa",
          "latest_revision": 0,
          "slug": "codecraft",
          "updated_at": "2024-05-22T14:01:16.975Z",
        }
      `);

      const { app_metadata, files, ...restVersion } = version!;
      expect(app_metadata).toMatchInlineSnapshot(`
        {
          "author": "CyberSherpa",
          "badges": [
            "mch2022",
            "why2025",
          ],
          "categories": [
            "Event related",
            "Games",
          ],
          "description": "With CodeCraft, you can do interesting things with the sensors.",
          "icon_map": {
            "64x64": "icon5.png",
          },
          "license_type": "MIT",
          "name": "CodeCraft",
        }
      `);
      const sortedFiles = files
        .map((f) => f.sha256)
        .sort()
        .map((sha) => files.find((f) => f.sha256 === sha));
      expect(sortedFiles).toMatchInlineSnapshot(`
        [
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".png",
            "full_path": "icon5.png",
            "id": 2,
            "mimetype": "image/png",
            "name": "icon5",
            "sha256": "3d9ca05fc7b1325be0586834b8dfae2b80626ca815f71cb92eb1b0c2650bd9a5",
            "size_formatted": "40.23KB",
            "size_of_content": 41199,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/icon5.png",
          },
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".py",
            "full_path": "__init__.py",
            "id": 3,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": 43,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/__init__.py",
          },
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".json",
            "full_path": "metadata.json",
            "id": 1,
            "mimetype": "application/json",
            "name": "metadata",
            "sha256": "8888905861998ad27ee1de337166d3d6f0c49d7154982bc8b19586b1da9c0251",
            "size_formatted": "0.24KB",
            "size_of_content": 247,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/metadata.json",
          },
        ]
      `);

      expect(restVersion).toMatchInlineSnapshot(`
        {
          "download_count": "0",
          "git_commit_id": null,
          "project_slug": "codecraft",
          "published_at": "2024-05-23T14:01:16.975Z",
          "revision": 0,
          "size_of_zip": null,
          "zip": null,
        }
      `);
    });

    test("GET /api/v3/projects/codecraft/rev0", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft/rev0");
      expect(res.statusCode).toBe(200);
      const project = res.body as ProjectDetails;

      const { version, ...restProject } = project;
      expect(restProject).toMatchInlineSnapshot(`
        {
          "created_at": "2024-05-22T14:01:16.975Z",
          "draft_revision": 1,
          "git": null,
          "idp_user_id": "CyberSherpa",
          "latest_revision": 0,
          "slug": "codecraft",
          "updated_at": "2024-05-22T14:01:16.975Z",
        }
      `);

      const { app_metadata, files, ...restVersion } = version!;
      expect(app_metadata).toMatchInlineSnapshot(`
        {
          "author": "CyberSherpa",
          "badges": [
            "mch2022",
            "why2025",
          ],
          "categories": [
            "Event related",
            "Games",
          ],
          "description": "With CodeCraft, you can do interesting things with the sensors.",
          "icon_map": {
            "64x64": "icon5.png",
          },
          "license_type": "MIT",
          "name": "CodeCraft",
        }
      `);
      const sortedFiles = files
        .map((f) => f.sha256)
        .sort()
        .map((sha) => files.find((f) => f.sha256 === sha));
      expect(sortedFiles).toMatchInlineSnapshot(`
        [
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".png",
            "full_path": "icon5.png",
            "id": 2,
            "mimetype": "image/png",
            "name": "icon5",
            "sha256": "3d9ca05fc7b1325be0586834b8dfae2b80626ca815f71cb92eb1b0c2650bd9a5",
            "size_formatted": "40.23KB",
            "size_of_content": 41199,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/icon5.png",
          },
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".py",
            "full_path": "__init__.py",
            "id": 3,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": 43,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/__init__.py",
          },
          {
            "created_at": "2024-05-22T14:01:16.975Z",
            "dir": "",
            "ext": ".json",
            "full_path": "metadata.json",
            "id": 1,
            "mimetype": "application/json",
            "name": "metadata",
            "sha256": "8888905861998ad27ee1de337166d3d6f0c49d7154982bc8b19586b1da9c0251",
            "size_formatted": "0.24KB",
            "size_of_content": 247,
            "updated_at": "2024-05-22T14:01:16.975Z",
            "url": "http://localhost:8081/api/v3/projects/codecraft/rev0/files/metadata.json",
          },
        ]
      `);

      expect(restVersion).toMatchInlineSnapshot(`
        {
          "download_count": "0",
          "git_commit_id": null,
          "project_slug": "codecraft",
          "published_at": "2024-05-23T14:01:16.975Z",
          "revision": 0,
          "size_of_zip": null,
          "zip": null,
        }
      `);
    });

    test("GET /api/v3/projects/codecraft/rev1 (unpublished version)", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft/rev1");
      expect(res.statusCode).toBe(404);
    });

    test.each(["latest", "rev0"])(
      "GET /projects/{slug}/%s/files/metadata.json",
      async (revision) => {
        const getRes = await request(app).get(
          `/api/v3/projects/codecraft/${revision}/files/metadata.json`
        );
        expect(getRes.statusCode).toBe(200);
        const metadata = JSON.parse(getRes.text) as AppMetadataJSON; // TODO, seems like we are returning the wrong content-type since we need to use .text here.
        expect(metadata.name).toEqual("CodeCraft");
      }
    );

    test("GET files using url prop should work same as from path", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft/rev0");
      expect(res.statusCode).toBe(200);
      const project = res.body as ProjectDetails;

      const files = project.version.files;
      expect(files.length).toBeGreaterThan(0); // Sanity check
      expect(project.version.published_at).toBeDefined(); // Sanity check
      for (const file of files) {
        const requestFromFilePath = await request(app).get(
          `/api/v3/projects/codecraft/rev${project.version.revision}/files/${encodeURIComponent(file.full_path)}`
        );
        expect(requestFromFilePath.statusCode).toBe(200);
        const requestFromUrl = await request(app).get(
          new URL(file.url).pathname
        );
        expect(requestFromUrl.statusCode).toBe(200);
        expect(requestFromFilePath.text).toEqual(requestFromUrl.text);
      }
    });

    test.each(["latest", "rev0"])(
      "GET /projects/{slug}/%s/files/__init__.py",
      async (revision) => {
        const getRes = await request(app).get(
          `/api/v3/projects/codecraft/${revision}/files/__init__.py`
        );
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toEqual(
          "print('Hello world from the CodeCraft app')"
        );
        expect(getRes.headers["content-disposition"]).toEqual(
          'attachment; filename="__init__.py"'
        );
      }
    );
    describe("unpublished versions should be be requestable", () => {
      test.each(["rev1", "rev2"])(
        "GET /projects/{slug}/%s/files/metadata.json",
        async (revision) => {
          const getRes = await request(app).get(
            `/api/v3/projects/codecraft/${revision}/files/metadata.json`
          );
          expect(getRes.statusCode).toBe(404);
        }
      );

      test.each(["rev1", "rev2"])(
        "GET /projects/{slug}/%s",
        async (revision) => {
          const getRes = await request(app).get(
            `/api/v3/projects/codecraft/${revision}`
          );
          expect(getRes.statusCode).toBe(404);
        }
      );
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
