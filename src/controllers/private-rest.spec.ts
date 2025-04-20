import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";
import { CreateProjectProps } from "@domain/writeModels/app/WriteProject";

const TEST_USER_ID = 0;
describe(
  "Authenticated API Routes",
  () => {
    let app: ReturnType<typeof express>;
    beforeEach(() => {
      app = createExpressServer(true);
    });
    test("CREATE/READ/DELETE /apps/{slug}/draft/files/{filePath}", async () => {
      const postRes = await request(app)
        .post("/api/v3/apps/codecraft/draft/files/test.txt")
        .attach("file", Buffer.from("test file content"), "test.txt");
      expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes = await request(app).get(
        "/api/v3/apps/codecraft/draft/files/test.txt"
      );
      expect(getRes.statusCode).toBe(200);
      expect(getRes.text).toBe("test file content");
      const deleteRes = await request(app).delete(
        "/api/v3/apps/codecraft/draft/files/test.txt"
      );
      expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes2 = await request(app).get(
        "/api/v3/apps/codecraft/draft/files/test.txt"
      );
      expect(getRes2.statusCode).toBe(404);
    });

    test("Overwrite deleted file", async () => {
      const postRes1 = await request(app)
        .post("/api/v3/apps/codecraft/draft/files/test.txt")
        .attach("file", Buffer.from("test file content"), "test.txt");
      expect(postRes1.statusCode.toString()).toMatch(/2\d\d/);

      const deleteRes = await request(app).delete(
        "/api/v3/apps/codecraft/draft/files/test.txt"
      );
      expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
      const postRes2 = await request(app)
        .post("/api/v3/apps/codecraft/draft/files/test.txt")
        .attach("file", Buffer.from("test file content"), "test.txt");
      expect(postRes2.statusCode.toString()).toMatch(/2\d\d/);
      const getRes = await request(app).get(
        "/api/v3/apps/codecraft/draft/files/test.txt"
      );
      expect(getRes.statusCode).toBe(200);
      expect(getRes.text).toBe("test file content");
    });

    test("CREATE/READ/DELETE app", async () => {
      const createProjectProps: Omit<CreateProjectProps, "slug"> = {
        user_id: TEST_USER_ID,
      };

      const Test_APP_ID = `test_app_${Date.now()}`;
      const postRes = await request(app)
        .post(`/api/v3/apps/${Test_APP_ID}`)
        .send(createProjectProps);
      expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes = await request(app).get(
        `/api/v3/apps/${Test_APP_ID}/draft`
      );
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body).toMatchInlineSnapshot(`
        {
          "allow_team_fixes": false,
          "category": "Uncategorised",
          "collaborators": [],
          "created_at": "2025-04-20T07:20:43.803Z",
          "description": null,
          "git": null,
          "git_commit_id": null,
          "interpreter": null,
          "license": null,
          "name": null,
          "published_at": null,
          "revision": null,
          "size_of_zip": null,
          "slug": "test_app_1745133846421",
          "updated_at": "2025-04-20T07:20:43.803Z",
          "user_id": 0,
          "user_name": "TechTinkerer",
          "version": {
            "app_metadata": {
              "author": null,
              "category": null,
              "description": null,
              "file_mappings": null,
              "file_mappings_overrides": null,
              "icon": null,
              "interpreter": null,
              "is_hidden": null,
              "is_library": null,
              "license_file": null,
              "main_executable": null,
              "main_executable_overrides": null,
              "name": "test_app_1745133846421",
              "semantic_version": null,
            },
            "app_metadata_json_id": 93,
            "created_at": "2025-04-20T07:20:43.803Z",
            "download_count": "0",
            "files": [],
            "git_commit_id": null,
            "id": 136,
            "project_slug": "test_app_1745133846421",
            "published_at": null,
            "revision": 0,
            "semantic_version": null,
            "size_of_zip": null,
            "updated_at": "2025-04-20T07:20:43.803Z",
            "zip": null,
          },
        }
      `);
      const deleteRes = await request(app).delete(
        `/api/v3/apps/${Test_APP_ID}`
      );
      expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes2 = await request(app).get(`/api/v3/apps/${Test_APP_ID}`);
      expect(getRes2.statusCode).toBe(404);
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
