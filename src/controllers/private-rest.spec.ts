import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";
import { CreateProjectProps } from "@domain/writeModels/project/WriteProject";
import { stripDatedData } from "@db/sqlHelpers/dbDates";

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

    test("CREATE/READ/DELETE project", async () => {
      const createProjectProps: Omit<CreateProjectProps, "slug"> = {
        user_id: TEST_USER_ID,
      };
      // Reason that we make the test project id dynamic is to avoid that the test fails if you run it multiple times locally and possibly stop halfware through the test.
      const dynamicTestAppId = `test_app_${Date.now()}`;
      const postRes = await request(app)
        .post(`/api/v3/apps/${dynamicTestAppId}`)
        .send(createProjectProps);
      expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes = await request(app).get(
        `/api/v3/apps/${dynamicTestAppId}/draft`
      );
      expect(getRes.statusCode).toBe(200);
      expect({
        ...stripDatedData(getRes.body),
        version: stripDatedData(getRes.body.version),
      }).toMatchObject({
        allow_team_fixes: false,
        category: "Uncategorised",
        collaborators: [],
        description: null,
        git: null,
        git_commit_id: null,
        interpreter: null,
        license: null,
        name: null,
        published_at: null,
        revision: null,
        size_of_zip: null,
        slug: dynamicTestAppId,
        user_id: 0,
        user_name: "TechTinkerer",
        version: {
          app_metadata: {
            author: null,
            category: null,
            description: null,
            file_mappings: null,
            file_mappings_overrides: null,
            icon: null,
            interpreter: null,
            is_hidden: null,
            is_library: null,
            license_file: null,
            main_executable: null,
            main_executable_overrides: null,
            name: dynamicTestAppId,
            semantic_version: null,
          },
          app_metadata_json_id: expect.any(Number),
          download_count: "0",
          files: [],
          git_commit_id: null,
          id: expect.any(Number),
          project_slug: dynamicTestAppId,
          published_at: null,
          revision: 0,
          semantic_version: null,
          size_of_zip: null,
          zip: null,
        },
      });
      const deleteRes = await request(app).delete(
        `/api/v3/apps/${dynamicTestAppId}`
      );
      expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
      const getRes2 = await request(app).get(
        `/api/v3/apps/${dynamicTestAppId}`
      );
      expect(getRes2.statusCode).toBe(404);
    });

    test("publish version and change metadata", async () => {
      // Create a new project
      const TEST_APP_ID = `test_app_publish_${Date.now()}`;
      const postRes = await request(app)
        .post(`/api/v3/apps/${TEST_APP_ID}`)
        .send({ user_id: TEST_USER_ID });
      expect(postRes.statusCode.toString()).toMatch(/2\d\d/);

      // Add metadata to the project
      const updateAppRes = await request(app)
        .patch(`/api/v3/apps/${TEST_APP_ID}/draft/metadata`)
        .send({
          description: "Test App Description Before Publish",
        });
      expect(updateAppRes.status.toString()).toMatch(/2\d\d/);

      // Verify the metadata was added
      const getRes1 = await request(app).get(
        `/api/v3/apps/${TEST_APP_ID}/draft`
      );
      expect(getRes1.statusCode).toBe(200);
      expect(getRes1.body.version.app_metadata.description).toBe(
        "Test App Description Before Publish"
      );

      // Publish the project to create a new version
      const publishRes = await request(app).patch(
        `/api/v3/apps/${TEST_APP_ID}/publish`
      );
      expect(publishRes.statusCode.toString()).toMatch(/2\d\d/);

      // Update the metadata of the draft version after publishing
      const updateAppRes2 = await request(app)
        .patch(`/api/v3/apps/${TEST_APP_ID}/draft/metadata`)
        .send({
          description: "Test App Description After Publish",
        });
      expect(updateAppRes2.status.toString()).toMatch(/2\d\d/);

      // Verify the metadata was updated on the draft version
      const getDraftRes = await request(app).get(
        `/api/v3/apps/${TEST_APP_ID}/draft`
      );
      expect(getDraftRes.statusCode).toBe(200);
      expect(getDraftRes.body.name).toBe(TEST_APP_ID);
      expect(getDraftRes.body.version.app_metadata.description).toBe(
        "Test App Description After Publish"
      );

      // Verify the metadata of the published version remains unchanged
      const getLatestRes = await request(app).get(
        `/api/v3/apps/${TEST_APP_ID}`
      );
      expect(getLatestRes.statusCode).toBe(200);
      expect(getLatestRes.body.name).toBe(TEST_APP_ID);
      expect(getLatestRes.body.version.app_metadata.description).toBe(
        "Test App Description Before Publish"
      );
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
