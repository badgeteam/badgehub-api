import { afterEach, beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";
import { CreateProjectProps } from "@domain/writeModels/project/WriteProject";

const TEST_USER_ID = 0;
const ADMIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnUGI4VjZ5dHZTMkpFakdjVDFlLWdTWVRPbFBTNm04Xzkta210cHFDMktVIn0.eyJleHAiOjE3NDY5NTkxNzQsImlhdCI6MTc0Njk1OTExNCwiYXV0aF90aW1lIjoxNzQ2OTU5MTEzLCJqdGkiOiI2ZWExM2I5YS1mMWY2LTRmMTAtYjg4OC1mZmQwYTY0NTRkOWUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnAxbS5ubC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiMmRkZDg0MmItNDQ4MS00ZTUwLThmOTQtNTYxYmFhY2VjNmEzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFkZ2VodWJfbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiN2U1MzZjMDgtZTE3OS00MDVkLThiZTctNTgxZmRmNTE5Nzk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAvIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Im1hc3Rlci1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjdlNTM2YzA4LWUxNzktNDA1ZC04YmU3LTU4MWZkZjUxOTc5NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.qF1uhnElHNBRAj4ZsPQn2UWnA_TqMMyNeQHiR6IBrZ-GtjkBGy0CYvLyfbLbhFElqFACW58JEbrDUF8J0PpQWSCqEuRCU9fkadtJHV9ALh-XSLJHgK0Q3saMubHiOYne0q8IhxQgK4m1JxY57CHkExUQcoLS50uLbzqbZrIaQvYrP80wb3nXsCTz9oUD1mkgOxCmhYwkrXji7aWbfe5Mw_46gONDRoXPql72c-xqUh7NdAKyPemcUv2fT8tl7zN3nBui4PQCf3J0g0Pq9gbJSFBgVAXfJewKCe-V0akPEMSrxT3Aq7YtmigFqZ-a0lIMYPsvae6xXY7Fu8rOIRGNPQ";
const USER2_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnUGI4VjZ5dHZTMkpFakdjVDFlLWdTWVRPbFBTNm04Xzkta210cHFDMktVIn0.eyJleHAiOjE3NDY5NTkxNzQsImlhdCI6MTc0Njk1OTExNCwiYXV0aF90aW1lIjoxNzQ2OTU5MTEzLCJqdGkiOiI2ZWExM2I5YS1mMWY2LTRmMTAtYjg4OC1mZmQwYTY0NTRkOWUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnAxbS5ubC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiMmRkZDg0MmItNDQ4MS00ZTUwLThmOTQtNTYxYmFhY2VjNmEzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFkZ2VodWJfbG9jYWwiLCJzZXNzaW9uX3N0YXRlIjoiN2U1MzZjMDgtZTE3OS00MDVkLThiZTctNTgxZmRmNTE5Nzk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAvIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Im1hc3Rlci1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjdlNTM2YzA4LWUxNzktNDA1ZC04YmU3LTU4MWZkZjUxOTc5NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.qF1uhnElHNBRAj4ZsPQn2UWnA_TqMMyNeQHiR6IBrZ-GtjkBGy0CYvLyfbLbhFElqFACW58JEbrDUF8J0PpQWSCqEuRCU9fkadtJHV9ALh-XSLJHgK0Q3saMubHiOYne0q8IhxQgK4m1JxY57CHkExUQcoLS50uLbzqbZrIaQvYrP80wb3nXsCTz9oUD1mkgOxCmhYwkrXji7aWbfe5Mw_46gONDRoXPql72c-xqUh7NdAKyPemcUv2fT8tl7zN3nBui4PQCf3J0g0Pq9gbJSFBgVAXfJewKCe-V0akPEMSrxT3Aq7YtmigFqZ-a0lIMYPsvae6xXY7Fu8rOIRGNPQ";

describe(
  "The API should return a 403 if the user is not authorized of the project or operation",
  () => {
    let app: ReturnType<typeof express>;
    let randomUUID: string;
    beforeEach(() => {
      randomUUID = crypto.randomUUID();
      app = createExpressServer();
    });
    describe("/projects/{slug}/draft", () => {
      test.each(["codecraft"])(
        "GET /projects/{slug}/draft ",
        async (projectName) => {
          const res = await request(app)
            .get(`/api/v3/projects/${projectName}/draft`)
            .auth(USER2_TOKEN, { type: "bearer" });
          expect(res.statusCode).toBe(403);
        }
      );
    });

    describe("/projects/{slug}/draft/files/{filePath}", () => {
      test("POST /projects/{slug}/draft/files/{filePath}", async () => {
        const res = await request(app)
          .post(`/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`)
          .auth(USER2_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(res.statusCode).toBe(403);
      });
      describe("GET/DELETE /api/v3/projects/codecraft/draft/files/test_[random].txt", () => {
        const ORIGINAL_FILE_CONTENT = "original file content";
        beforeEach(async () => {
          const res = await request(app)
            .post(
              `/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`
            )
            .auth(ADMIN_TOKEN, { type: "bearer" })
            .attach("file", Buffer.from(ORIGINAL_FILE_CONTENT), "test.txt");
          expect(res.statusCode).toBe(403);
        });
        afterEach(async () => {
          const getRes2 = await request(app)
            .get(
              `/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`
            )
            .auth(ADMIN_TOKEN, { type: "bearer" });
          expect(getRes2.statusCode).toBe(200);
          expect(getRes2.text).toBe(ORIGINAL_FILE_CONTENT);
        });
        test("GET /projects/codecraft/draft/files/test.txt", async () => {
          const getRes = await request(app)
            .get(
              `/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`
            )
            .auth(USER2_TOKEN, { type: "bearer" });
          expect(getRes.statusCode).toBe(403);
        });
        test("DELETE /projects/codecraft/draft/files/test.txt", async () => {
          const deleteRes = await request(app)
            .delete(
              `/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`
            )
            .auth(USER2_TOKEN, { type: "bearer" });
          expect(deleteRes.statusCode).toBe(403);
        });
        test("POST /projects/codecraft/draft/files/test.txt", async () => {
          const postRes = await request(app)
            .post(
              `/api/v3/projects/codecraft/draft/files/test_${randomUUID}.txt`
            )
            .auth(USER2_TOKEN, { type: "bearer" })
            .attach("file", Buffer.from(ORIGINAL_FILE_CONTENT), "test.txt");
          expect(postRes.statusCode).toBe(403);
        });
      });
    });

    describe("/projects/${TEST_APP_ID}", () => {
      let dynamicTestAppId: string;
      let originalProject: string;
      beforeEach(async () => {
        const createProjectProps: Omit<CreateProjectProps, "slug"> = {
          user_id: TEST_USER_ID,
        };
        // Reason that we make the test project id dynamic is to avoid that the test fails if you run it multiple times locally and possibly stop halfware through the test.
        dynamicTestAppId = `test_app_${crypto.randomUUID()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send(createProjectProps);
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/);
        const getRes = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200); // Sanity check
        originalProject = getRes.body;
      });
      afterEach(async () => {
        const getRes = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200); // Sanity check
        expect(getRes.body).toEqual(originalProject);
      });
      test("GET project", async () => {
        const getRes = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(USER2_TOKEN, { type: "bearer" });
        expect(getRes.status).toBe(403);
        expect(getRes.body).not.toEqual(originalProject);
      });
      test("DELETE project", async () => {
        const delRes = await request(app)
          .delete(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(delRes.status).toBe(403);
      });
      test("PATCH project", async () => {
        const updateAppRes = await request(app)
          .patch(`/api/v3/projects/${dynamicTestAppId}/draft/metadata`)
          .auth(ADMIN_TOKEN, { type: "bearer" })
          .send({
            description: "Test App Description Before Publish",
          });
        expect(updateAppRes.status).toBe(403);
      });
    });

    describe("/api/v3/projects/{slug}/publish", () => {
      test("publish version", async () => {
        // Create a new project
        const dynamicTestAppId = `test_app_publish_${randomUUID}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(USER2_TOKEN, { type: "bearer" })
          .send({ user_id: TEST_USER_ID });
        expect(postRes.statusCode.toString()).toMatch(/2\d\d/); // Sanity check

        // Verify the metadata was added
        const getRes1 = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes1.statusCode).toBe(200);

        // Try Publish the project to create a new version
        const publishRes = await request(app)
          .patch(`/api/v3/projects/${dynamicTestAppId}/publish`)
          .auth(USER2_TOKEN, { type: "bearer" });
        expect(publishRes.statusCode).toEqual(403);

        const getRes2 = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(ADMIN_TOKEN, { type: "bearer" });
        expect(getRes2.statusCode).toBe(200);
        expect(getRes2.body).toEqual(getRes1.body);
      });
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
