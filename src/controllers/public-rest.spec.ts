import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { Project, ProjectWithoutVersion } from "@domain/readModels/app/Project";
import { Badge } from "@domain/readModels/Badge";
import { isInDebugMode } from "@util/debug";
import { AppMetadataJSON } from "@domain/readModels/app/AppMetadataJSON";
import { stripDatedData } from "@db/sqlHelpers/dbDates";

function stripId<T extends { id?: unknown } | object>(
  stripDatedData1: T
): Omit<T, "id"> {
  const { id, ...rest } = stripDatedData1 as { id?: unknown };
  return rest as Omit<T, "id">;
}

describe(
  "Public API Routes",
  () => {
    let app: ReturnType<typeof express>;
    beforeEach(() => {
      app = createExpressServer();
    });

    test("GET /api/v3/devices", async () => {
      const res = await request(app).get("/api/v3/devices");
      expect(res.statusCode).toBe(200);
      expect(
        res.body.find((badge: Badge) => badge.slug === "why2025")
      ).toBeDefined();
      expect(res.body[0]).toEqual({
        slug: "mch2022",
        name: "mch2022",
      });
    });

    test("GET /api/v3/apps", async () => {
      const res = await request(app).get("/api/v3/apps");
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
          "collaborators": [],
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
        }
      `);
    });

    test("GET /api/v3/apps/codecraft", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft");
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
          "collaborators": [],
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
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
          "icon": null,
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
            "id": 2,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": "43",
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
            "sha256": "d1010a609b51931a168bd38aedbdb952ca51b3f05505f3a4f5fd2ad604f66a23",
            "size_formatted": "0.25KB",
            "size_of_content": "259",
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

    test("GET /api/v3/apps/codecraft/rev0", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft/rev0");
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
          "collaborators": [],
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
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
          "icon": null,
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
            "id": 2,
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df",
            "size_formatted": "0.04KB",
            "size_of_content": "43",
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
            "sha256": "d1010a609b51931a168bd38aedbdb952ca51b3f05505f3a4f5fd2ad604f66a23",
            "size_formatted": "0.25KB",
            "size_of_content": "259",
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

    test("GET /api/v3/apps/codecraft/rev1 (unpublished version)", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft/rev1");
      expect(res.statusCode).toBe(404);
    });

    test("GET /api/v3/apps/codecraft/draft", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft/draft");
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
          "collaborators": [],
          "created_at": "2024-11-01T13:12:19.376Z",
          "description": "Use CodeCraft for some cool graphical effects.",
          "git": null,
          "git_commit_id": null,
          "interpreter": "python",
          "license": "MIT",
          "name": "CodeCraft",
          "published_at": "2022-09-06T13:12:19.376Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
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
          "icon": null,
          "interpreter": "python",
          "is_hidden": null,
          "is_library": null,
          "license_file": "MIT",
          "main_executable": null,
          "main_executable_overrides": null,
          "name": "CodeCraft",
          "semantic_version": "0.0.1",
        }
      `);
      const sortedFiles = files
        .map((f) => f.sha256)
        .sort()
        .map((sha) => files.find((f) => f.sha256 === sha));
      expect(
        sortedFiles
          .filter((f) => f !== undefined)
          .map((f) => stripId(stripDatedData(f)))
      ).toMatchInlineSnapshot(`
        [
          {
            "dir": "",
            "ext": ".json",
            "full_path": "metadata.json",
            "mimetype": "application/json",
            "name": "metadata",
            "sha256": "1f4d5b318a2139beec2517700780dc8c22ece9dda55a3f0b1a7dc0761d14dce4",
            "size_formatted": "0.28KB",
            "size_of_content": "286",
          },
          {
            "dir": "",
            "ext": ".txt",
            "full_path": "test.txt",
            "mimetype": "text/plain",
            "name": "test",
            "sha256": "60f5237ed4049f0382661ef009d2bc42e48c3ceb3edb6600f7024e7ab3b838f3",
            "size_formatted": "0.02KB",
            "size_of_content": "17",
          },
          {
            "dir": "",
            "ext": ".py",
            "full_path": "__init__.py",
            "mimetype": "text/x-python-script",
            "name": "__init__",
            "sha256": "8a0f66fd92bb888c9fca54ad993b083dcf046587dfc392b51e02966fb6eb4527",
            "size_formatted": "0.05KB",
            "size_of_content": "48",
          },
        ]
      `);

      expect(restVersion).toMatchInlineSnapshot(`
        {
          "app_metadata_json_id": 88,
          "created_at": "2022-09-06T13:12:19.376Z",
          "download_count": "0",
          "git_commit_id": null,
          "id": 88,
          "project_slug": "codecraft",
          "published_at": null,
          "revision": 1,
          "semantic_version": null,
          "size_of_zip": null,
          "updated_at": "2022-09-06T13:12:19.376Z",
          "zip": null,
        }
      `);
    });

    test.each(["draft", "latest", "rev0", "rev1"])(
      "GET /apps/{slug}/%s/files/metadata.json",
      async (revision) => {
        const getRes = await request(app).get(
          `/api/v3/apps/codecraft/${revision}/files/metadata.json`
        );
        expect(getRes.statusCode).toBe(200);
        const metadata = JSON.parse(getRes.text) as AppMetadataJSON; // TODO, seems like we are returning the wrong content-type since we need to use .text here.
        expect(metadata.name).toEqual("CodeCraft");
      }
    );

    test.each(["latest", "rev0"])(
      "GET /apps/{slug}/%s/files/__init__.py",
      async (revision) => {
        const getRes = await request(app).get(
          `/api/v3/apps/codecraft/${revision}/files/__init__.py`
        );
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toEqual(
          "print('Hello world from the CodeCraft app')"
        );
      }
    );

    test.each(["draft", "rev1"])(
      "GET /apps/{slug}/%s/files/__init__.py",
      async (revision) => {
        const getRes = await request(app).get(
          `/api/v3/apps/codecraft/${revision}/files/__init__.py`
        );
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toEqual(
          "print('Hello world from the CodeCraft app0.0.1')"
        );
      }
    );
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
