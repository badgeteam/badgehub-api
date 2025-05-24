import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";
import { CreateProjectProps } from "@domain/writeModels/project/WriteProject";
import { stripDatedData } from "@db/sqlHelpers/dbDates";

const TEST_USER_ID = 0;
const ADMIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnUGI4VjZ5dHZTMkpFakdjVDFlLWdTWVRPbFBTNm04Xzkta210cHFDMktVIn0.eyJleHAiOjE3NDY5NTkxNzQsImlhdCI6MTc0Njk1OTExNCwiYXV0aF90aW1lIjoxNzQ2OTU5MTEzLCJqdGkiOiI2ZWExM2I5YS1mMWY2LTRmMTAtYjg4OC1mZmQwYTY0NTRkOWUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnAxbS5ubC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiMmRkZDg0MmItNDQ4MS00ZTUwLThmOTQtNTYxYmFhY2VjNmEzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFkZ2VodWJfbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiN2U1MzZjMDgtZTE3OS00MDVkLThiZTctNTgxZmRmNTE5Nzk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAvIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Im1hc3Rlci1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjdlNTM2YzA4LWUxNzktNDA1ZC04YmU3LTU4MWZkZjUxOTc5NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.qF1uhnElHNBRAj4ZsPQn2UWnA_TqMMyNeQHiR6IBrZ-GtjkBGy0CYvLyfbLbhFElqFACW58JEbrDUF8J0PpQWSCqEuRCU9fkadtJHV9ALh-XSLJHgK0Q3saMubHiOYne0q8IhxQgK4m1JxY57CHkExUQcoLS50uLbzqbZrIaQvYrP80wb3nXsCTz9oUD1mkgOxCmhYwkrXji7aWbfe5Mw_46gONDRoXPql72c-xqUh7NdAKyPemcUv2fT8tl7zN3nBui4PQCf3J0g0Pq9gbJSFBgVAXfJewKCe-V0akPEMSrxT3Aq7YtmigFqZ-a0lIMYPsvae6xXY7Fu8rOIRGNPQ";

describe(
  "Authenticated API Routes",
  () => {
    let app: ReturnType<typeof express>;
    beforeEach(() => {
      app = createExpressServer();
    });
    describe("/projects/{slug}/draft", () => {
      test("non-existing /projects/{slug}/draft", async () => {
        const res = await request(app)
          .get("/api/v3/projects/non-existing/draft")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(res.statusCode).toBe(404);
      });

      test.each(["non-existing", "codecraft"])(
        "should respond with 401 for [%s] if there is no valid jwt token in the request",
        async (projectName) => {
          const res = await request(app).get(
            `/api/v3/projects/${projectName}/draft`
          );
          expect(res.statusCode).toBe(401);
        }
      );
    });

    describe("/projects/{slug}/draft/files/{filePath}", () => {
      test("CREATE/READ/DELETE /projects/{slug}/draft/files/{filePath}", async () => {
        const postRes = await request(app)
          .post("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
        const getRes = await request(app)
          .get("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toBe("test file content");
        const deleteRes = await request(app)
          .delete("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
        const getRes2 = await request(app)
          .get("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes2.statusCode).toBe(404);
      });

      test("Overwrite deleted file", async () => {
        const postRes1 = await request(app)
          .post("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes1.statusCode.toString()).toMatch(/2\d\d/);

        const deleteRes = await request(app)
          .delete("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
        const postRes2 = await request(app)
          .post("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes2.statusCode.toString()).toMatch(/2\d\d/);
        const getRes = await request(app)
          .get("/api/v3/projects/codecraft/draft/files/test.txt")
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toBe("test file content");
      });
    });

    describe("/projects/{slug}", () => {
      test("CREATE/READ/DELETE project", async () => {
        const createProjectProps: Omit<CreateProjectProps, "slug"> = {
          user_id: TEST_USER_ID,
        };
        // Reason that we make the test project id dynamic is to avoid that the test fails if you run it multiple times locally and possibly stop halfware through the test.
        const dynamicTestAppId = `test_app_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send(createProjectProps);
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
        const getRes = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect({
          ...stripDatedData(getRes.body),
          version: stripDatedData(getRes.body.version),
        }).toMatchObject({
          allow_team_fixes: false,
          category: "Uncategorised",
          description: null,
          git: null,
          git_commit_id: null,
          interpreter: null,
          license: null,
          name: dynamicTestAppId,
          published_at: null,
          revision: 0,
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
        const deleteRes = await request(app)
          .delete(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode.toString()).toMatch(/2\d\d/);
        const getRes2 = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes2.statusCode).toBe(404);
      });

      test("create draft project with slug only", async () => {
        // Create a new project with only a slug
        const TEST_APP_ID = `test_app_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${TEST_APP_ID}`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send({ user_id: TEST_USER_ID });
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/);

        // Verify the project was created with the correct slug
        const getRes = await request(app)
          .get(`/api/v3/projects/${TEST_APP_ID}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.slug).toBe(TEST_APP_ID);
      });
    });

    describe("/api/v3/projects/{slug}/publish", () => {
      test("publish version and change metadata", async () => {
        // Create a new project
        const TEST_APP_ID = `test_app_publish_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${TEST_APP_ID}`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send({ user_id: TEST_USER_ID });
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/);

        // Add metadata to the project
        const updateAppRes = await request(app)
          .patch(`/api/v3/projects/${TEST_APP_ID}/draft/metadata`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send({
            description: "Test App Description Before Publish",
          });
        expect(updateAppRes.status.toString()).toMatch(/2\d\d/);

        // Verify the metadata was added
        const getRes1 = await request(app)
          .get(`/api/v3/projects/${TEST_APP_ID}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes1.statusCode).toBe(200);
        expect(getRes1.body.version.app_metadata.description).toBe(
          "Test App Description Before Publish"
        );

        // Publish the project to create a new version
        const publishRes = await request(app)
          .patch(`/api/v3/projects/${TEST_APP_ID}/publish`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(publishRes.statusCode.toString()).toMatch(/2\d\d/);

        // Update the metadata of the draft version after publishing
        const updateAppRes2 = await request(app)
          .patch(`/api/v3/projects/${TEST_APP_ID}/draft/metadata`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send({
            description: "Test App Description After Publish",
          });
        expect(updateAppRes2.status.toString()).toMatch(/2\d\d/);

        // Verify the metadata was updated on the draft version
        const getDraftRes = await request(app)
          .get(`/api/v3/projects/${TEST_APP_ID}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getDraftRes.statusCode).toBe(200);
        expect(getDraftRes.body.name).toBe(TEST_APP_ID);
        expect(getDraftRes.body.version.app_metadata.description).toBe(
          "Test App Description After Publish"
        );

        // Verify the metadata of the published version remains unchanged
        const getLatestRes = await request(app)
          .get(`/api/v3/projects/${TEST_APP_ID}`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getLatestRes.statusCode).toBe(200);
        expect(getLatestRes.body.name).toBe(TEST_APP_ID);
        expect(getLatestRes.body.version.app_metadata.description).toBe(
          "Test App Description Before Publish"
        );
      });
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
