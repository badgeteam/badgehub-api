import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";

describe(
  "API Routes",
  () => {
    let app: ReturnType<typeof express>;
    beforeEach(() => {
      app = createExpressServer();
    });
    test("GET /api/v3/devices", async () => {
      const res = await request(app).get("/api/v3/devices");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toMatchInlineSnapshot(`3`);
      expect(res.body[0]).toEqual({
        slug: "mch2022",
        name: "mch2022",
      });
    });

    test("GET /api/v3/apps", async () => {
      const res = await request(app).get("/api/v3/apps");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toMatchInlineSnapshot(`87`);
      expect(res.body[0]).toMatchInlineSnapshot(`
        {
          "allow_team_fixes": false,
          "badges": [
            "mch2022",
          ],
          "category": "Uncategorised",
          "collaborators": [],
          "created_at": "2024-12-31T18:26:24.784Z",
          "description": null,
          "git": null,
          "git_commit_id": null,
          "interpreter": null,
          "license": null,
          "name": null,
          "published_at": null,
          "revision": null,
          "size_of_zip": null,
          "slug": "pixelplayground",
          "updated_at": "2024-07-24T18:26:24.784Z",
          "user_id": 63,
          "user_name": "LogicLionheart",
        }
      `);
    });

    test("GET /api/v3/apps/codecraft", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft");
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchInlineSnapshot(`
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
          "published_at": "2024-06-10T14:18:04.636Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
          "version": {
            "app_metadata": {
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
            },
            "app_metadata_json_id": 1,
            "created_at": "2025-04-12T21:34:14.407Z",
            "download_count": "0",
            "files": [],
            "git_commit_id": null,
            "id": 88,
            "project_slug": "codecraft",
            "published_at": null,
            "revision": 1,
            "semantic_version": null,
            "size_of_zip": null,
            "updated_at": "2025-04-12T21:34:14.407Z",
            "zip": null,
          },
        }
      `);
    });

    test("GET /api/v3/apps/codecraft/rev0", async () => {
      const res = await request(app).get("/api/v3/apps/codecraft/rev0");
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchInlineSnapshot(`
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
          "published_at": "2024-06-10T14:18:04.636Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
          "version": {
            "app_metadata": {
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
            },
            "app_metadata_json_id": 1,
            "created_at": "2024-11-01T13:12:19.376Z",
            "download_count": "0",
            "files": [
              {
                "created_at": "2024-11-01T13:12:19.376Z",
                "dir": "",
                "ext": ".json",
                "full_path": "metadata.json",
                "id": 1,
                "mimetype": "application/json",
                "name": "metadata",
                "sha256": "d1010a609b51931a168bd38aedbdb952ca51b3f05505f3a4f5fd2ad604f66a23",
                "size_formatted": "0.26KB",
                "size_of_content": "259",
                "updated_at": "2022-09-05T13:12:19.376Z",
              },
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
            ],
            "git_commit_id": null,
            "id": 1,
            "project_slug": "codecraft",
            "published_at": "2024-06-10T14:18:04.636Z",
            "revision": 0,
            "semantic_version": null,
            "size_of_zip": null,
            "updated_at": "2022-09-05T13:12:19.376Z",
            "zip": null,
          },
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
      expect(res.body).toMatchInlineSnapshot(`
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
          "published_at": "2024-06-10T14:18:04.636Z",
          "revision": 0,
          "size_of_zip": null,
          "slug": "codecraft",
          "updated_at": "2022-09-05T13:12:19.376Z",
          "user_id": 24,
          "user_name": "NanoNavigator",
          "version": {
            "app_metadata": {
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
            },
            "app_metadata_json_id": 1,
            "created_at": "2025-04-12T21:34:14.407Z",
            "download_count": "0",
            "files": [],
            "git_commit_id": null,
            "id": 88,
            "project_slug": "codecraft",
            "published_at": null,
            "revision": 1,
            "semantic_version": null,
            "size_of_zip": null,
            "updated_at": "2025-04-12T21:34:14.407Z",
            "zip": null,
          },
        }
      `);
    });
  },
  { timeout: 3600_000 }
);
