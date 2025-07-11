import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import {
  Project,
  ProjectWithoutVersion,
} from "@shared/domain/readModels/project/Project";
import { Badge, BADGE_MAP } from "@shared/domain/readModels/Badge";
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
      expect(
        res.body.find((badge: Badge) => badge.slug === "why2025")
      ).toBeDefined();
    });

    test("GET /api/v3/projects", async () => {
      const res = await request(app).get("/api/v3/projects");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.find((app: ProjectWithoutVersion) => app.name === "PixelPulse")
      ).toBeDefined();
      expect(
        res.body.find((app: ProjectWithoutVersion) => app.slug === "codecraft")
      ).toMatchInlineSnapshot(`
        {
          "allow_team_fixes": false,
          "badges": [
            "why2025",
          ],
          "category": "Uncategorised",
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "icon": "icon4.png",
          "idp_user_id": "NanoNavigator",
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
        }
      `);
    });

    test("GET /api/v3/projects should not contain unpublished apps", async () => {
      const res = await request(app).get("/api/v3/projects");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.find((app: ProjectWithoutVersion) => !app.published_at)?.name
      ).toBeUndefined();
    });

    test("GET /api/v3/projects with device filter", async () => {
      const res = await request(app).get("/api/v3/projects?device=why2025");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.every((app: ProjectWithoutVersion) =>
          app.badges.includes("why2025")
        )
      ).toBe(true);
      expect(
        res.body.find((app: ProjectWithoutVersion) => app.slug === "codecraft")
      ).toBeDefined();
    });

    test("GET /api/v3/projects with category filter", async () => {
      const res = await request(app).get("/api/v3/projects?category=silly");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(
        res.body.every((app: ProjectWithoutVersion) => app.category === "Silly")
      ).toBe(true);
      expect(
        res.body.find((app: ProjectWithoutVersion) => app.category === "Silly")
      ).toBeDefined();
    });

    test("GET /api/v3/projects with device and category filters", async () => {
      const res = await request(app).get(
        "/api/v3/projects?device=why2025&category=silly"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(
        res.body.every(
          (app: ProjectWithoutVersion) =>
            app.badges.includes("why2025") && app.category === "Silly"
        )
      ).toBe(true);
      expect(
        res.body.find((app: ProjectWithoutVersion) => app.category === "Silly")
      ).toBeDefined();
    });

    test("GET /api/v3/projects/non-existent should return 404", async () => {
      const res = await request(app).get("/api/v3/projects/non-existent");
      expect(res.statusCode).toBe(404);
    });

    test("GET /api/v3/projects/codecraft", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft");
      expect(res.statusCode).toBe(200);

      const project = res.body as Project;

      const { version, ...restProject } = project;
      expect(restProject).toMatchInlineSnapshot(`
        {
          "allow_team_fixes": false,
          "badges": [
            "why2025",
          ],
          "category": "Uncategorised",
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "icon": "icon4.png",
          "idp_user_id": "NanoNavigator",
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
        }
      `);

      const { app_metadata, files, ...restVersion } = version!;
      expect(app_metadata).toMatchInlineSnapshot(`
        {
          "author": "NanoNavigator",
          "category": "Uncategorised",
          "description": "Use CodeCraft for some cool graphical effects.",
          "file_mappings": null,
          "file_mappings_overrides": null,
          "icon": "icon4.png",
          "interpreter": "python",
          "is_hidden": null,
          "is_library": null,
          "license_file": "MIT",
          "main_executable": null,
          "main_executable_overrides": null,
          "name": "CodeCraft",
          "semantic_version": null,
        }
      `);
      const sortedFiles = files
        .map((f) => f.sha256)
        .sort()
        .map((sha) => files.find((f) => f.sha256 === sha));
      expect(sortedFiles).toMatchInlineSnapshot(`
        [
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".py",
            "full_path": "__init__.py",
            "id": 3,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": 43,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".png",
            "full_path": "icon4.png",
            "id": 2,
            "mimetype": "image/png",
            "name": "icon4",
            "sha256": "44da43c75a062d1991837e7d7026019917a71d0c8b829aca7b45b8e82295b8c4",
            "size_formatted": "43.58KB",
            "size_of_content": 44629,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".json",
            "full_path": "metadata.json",
            "id": 1,
            "mimetype": "application/json",
            "name": "metadata",
            "sha256": "5f0edbaf9396dc2ff9060eb77b279dfebb047bb8a4efa8ea65029cf647b2c16e",
            "size_formatted": "0.27KB",
            "size_of_content": 278,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
        ]
      `);

      expect(restVersion).toMatchInlineSnapshot(`
        {
          "app_metadata_json_id": 1,
          "created_at": "2024-11-01T13:12:19.376Z",
          "download_count": "0",
          "git_commit_id": null,
          "id": 1,
          "project_slug": "codecraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "semantic_version": null,
          "size_of_zip": null,
          "updated_at": "2022-09-05T13:12:19.376Z",
          "zip": null,
        }
      `);
    });

    test("GET /api/v3/projects/codecraft/rev0", async () => {
      const res = await request(app).get("/api/v3/projects/codecraft/rev0");
      expect(res.statusCode).toBe(200);
      const project = res.body as Project;

      const { version, ...restProject } = project;
      expect(restProject).toMatchInlineSnapshot(`
        {
          "allow_team_fixes": false,
          "badges": [
            "why2025",
          ],
          "category": "Uncategorised",
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "icon": "icon4.png",
          "idp_user_id": "NanoNavigator",
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
        }
      `);

      const { app_metadata, files, ...restVersion } = version!;
      expect(app_metadata).toMatchInlineSnapshot(`
        {
          "author": "NanoNavigator",
          "category": "Uncategorised",
          "description": "Use CodeCraft for some cool graphical effects.",
          "file_mappings": null,
          "file_mappings_overrides": null,
          "icon": "icon4.png",
          "interpreter": "python",
          "is_hidden": null,
          "is_library": null,
          "license_file": "MIT",
          "main_executable": null,
          "main_executable_overrides": null,
          "name": "CodeCraft",
          "semantic_version": null,
        }
      `);
      const sortedFiles = files
        .map((f) => f.sha256)
        .sort()
        .map((sha) => files.find((f) => f.sha256 === sha));
      expect(sortedFiles).toMatchInlineSnapshot(`
        [
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".py",
            "full_path": "__init__.py",
            "id": 3,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": 43,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".png",
            "full_path": "icon4.png",
            "id": 2,
            "mimetype": "image/png",
            "name": "icon4",
            "sha256": "44da43c75a062d1991837e7d7026019917a71d0c8b829aca7b45b8e82295b8c4",
            "size_formatted": "43.58KB",
            "size_of_content": 44629,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
          {
            "created_at": "2024-11-01T13:12:19.376Z",
            "dir": "",
            "ext": ".json",
            "full_path": "metadata.json",
            "id": 1,
            "mimetype": "application/json",
            "name": "metadata",
            "sha256": "5f0edbaf9396dc2ff9060eb77b279dfebb047bb8a4efa8ea65029cf647b2c16e",
            "size_formatted": "0.27KB",
            "size_of_content": 278,
            "updated_at": "2022-09-05T13:12:19.376Z",
          },
        ]
      `);

      expect(restVersion).toMatchInlineSnapshot(`
        {
          "app_metadata_json_id": 1,
          "created_at": "2024-11-01T13:12:19.376Z",
          "download_count": "0",
          "git_commit_id": null,
          "id": 1,
          "project_slug": "codecraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "semantic_version": null,
          "size_of_zip": null,
          "updated_at": "2022-09-05T13:12:19.376Z",
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
