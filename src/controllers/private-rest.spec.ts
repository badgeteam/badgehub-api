import { beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";
import { stripDatedData } from "@db/sqlHelpers/dbDates";
import { decodeJwt } from "jose";
import { Version } from "@domain/readModels/project/Version";

const USER1_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnUGI4VjZ5dHZTMkpFakdjVDFlLWdTWVRPbFBTNm04Xzkta210cHFDMktVIn0.eyJleHAiOjE3NDgyOTA4NzMsImlhdCI6MTc0ODI5MDgxMywiYXV0aF90aW1lIjoxNzQ4MjkwODEzLCJqdGkiOiI1NmIzOTUwNS0yYjJmLTQ1MDgtOTY0NC03NTFmN2FjMzI0ZGQiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnAxbS5ubC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQ4MDc1MzM3LTBmMTAtNGNkYi04YjQ4LWJlMWRjMTg3NDdhMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJhZGdlaHViIiwic2Vzc2lvbl9zdGF0ZSI6IjIzMWFkYmRkLTE1NDctNDRjYi1hNjI3LTI2MjJmNzI2YzcxMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9iYWRnZWh1Yi5wMW0ubmwvIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiMjMxYWRiZGQtMTU0Ny00NGNiLWE2MjctMjYyMmY3MjZjNzEwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoidGVzdCB1c2VyIDEgVGVzdGVyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXIxIiwiZ2l2ZW5fbmFtZSI6InRlc3QgdXNlciAxIiwiZmFtaWx5X25hbWUiOiJUZXN0ZXIiLCJlbWFpbCI6ImZkdXZpdmllcit0ZXN0dXNlcjFAZ21haWwuY29tIn0.h9R3nkDZ4C1LMAHKY-iBr24vW2tZMDwNgkA-6S1GQ2KNdnCjaOnROGB0bOCD5vaJO09YqItduM2gBD-oWGX0WuX57p5r5h3lCJi12NEV1YUdc0Z_pqB5ZvmXnJcquejqnnIiia8utcsOUQOsvhDZI4E0afyNl4J0JzcTwwIeOsP_oxkaFCb1aIMOVEIVwyOQYUfIcXsyFNJm356zgMQbD3WNI3eNCi2bDs-KfKaasCdgrMYjEM7gfXetgkJVbgT0v0AXyo9pzVGFDjzNPkoNNo0P5in8AA0qh2C3F-EXFsj3Xmagb_K1un94q4wW4IEMUqbhHbuR2bdePzg6219-Kg";
const USER1_ID = decodeJwt(USER1_TOKEN).sub;

describe(
  "Authenticated API Routes",
  () => {
    let app: ReturnType<typeof express>;
    let user1AppId: string;
    beforeAll(async () => {
      console.warn = () => {}; // Suppress console.warn messages during tests
      app = createExpressServer();
      user1AppId = `test_user1_app_${crypto.randomUUID()}`;
      const postRes = await request(app)
        .post(`/api/v3/projects/${user1AppId}`)
        .auth(USER1_TOKEN, { type: "bearer" })
        .send();
      expect(postRes.statusCode).toBe(204);
    });

    describe("/projects/{slug}/draft", () => {
      test("non-existing /projects/{slug}/draft", async () => {
        const res = await request(app)
          .get("/api/v3/projects/non-existing/draft")
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(res.statusCode).toBe(404);
      });

      test.each(["non-existing", "codecraft"])(
        "should respond with 401 for [%s] if there is no jwt token in the request",
        async (projectName) => {
          const res = await request(app).get(
            `/api/v3/projects/${projectName}/draft`
          );
          expect(res.statusCode).toBe(401);
        }
      );

      test.each(["non-existing", "codecraft"])(
        "should respond with 401 for [%s] if the valid jwt token in the request cannot be decoded",
        async (projectName) => {
          const res = await request(app)
            .get(`/api/v3/projects/${projectName}/draft`)
            .auth("some random string", { type: "bearer" });
          expect(res.statusCode).toBe(401);
        }
      );
    });

    describe("/projects/{slug}/draft/files/{filePath}", () => {
      test("CREATE/READ/DELETE /projects/{slug}/draft/files/{filePath}", async () => {
        const postRes = await request(app)
          .post(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes.statusCode).toBe(204);
        const getRes = await request(app)
          .get(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toBe("test file content");
        const deleteRes = await request(app)
          .delete(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode).toBe(204);
        const getRes2 = await request(app)
          .get(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes2.statusCode).toBe(404);
      });

      test("Overwrite deleted file", async () => {
        const postRes1 = await request(app)
          .post(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes1.statusCode).toBe(204);

        const deleteRes = await request(app)
          .delete(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode).toBe(204);
        const postRes2 = await request(app)
          .post(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .attach("file", Buffer.from("test file content"), "test.txt");
        expect(postRes2.statusCode).toBe(204);
        const getRes = await request(app)
          .get(`/api/v3/projects/${user1AppId}/draft/files/test.txt`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.text).toBe("test file content");
      });
    });

    describe("/projects/{slug}", () => {
      test("CREATE/READ/DELETE project", async () => {
        // Reason that we make the test project id dynamic is to avoid that the test fails if you run it multiple times locally and possibly stop halfware through the test.
        const dynamicTestAppId = `test_app_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send();
        const patchRes = await request(app)
          .patch(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send({ git: "https://github.com" });
        expect(patchRes.statusCode).toBe(204);
        const patchMetadataRes = await request(app)
          .patch(`/api/v3/projects/${dynamicTestAppId}/draft/metadata`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send({ name: "Test App Name", description: "Test App Description" });
        expect(patchMetadataRes.statusCode).toBe(204);

        const getRes = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}/draft`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);

        const versionInResponse = getRes.body.version as Version;
        expect({
          ...stripDatedData(getRes.body),
          version: { ...stripDatedData(versionInResponse), files: undefined },
        }).toMatchObject({
          allow_team_fixes: false,
          category: "Uncategorised",
          description: "Test App Description",
          git: "https://github.com",
          git_commit_id: null,
          interpreter: null,
          license: null,
          name: "Test App Name",
          published_at: null,
          revision: 0,
          slug: dynamicTestAppId,
          version: {
            app_metadata: {
              author: null,
              category: null,
              description: "Test App Description",
              file_mappings: null,
              file_mappings_overrides: null,
              icon: null,
              interpreter: null,
              is_hidden: null,
              is_library: null,
              license_file: null,
              main_executable: null,
              main_executable_overrides: null,
              name: "Test App Name",
              semantic_version: null,
            },
            app_metadata_json_id: expect.any(Number),
            download_count: "0",
            files: undefined,
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

        expect(versionInResponse.files.length).toEqual(1);
        expect(versionInResponse.files[0]).toMatchObject({
          full_path: "metadata.json",
          id: expect.any(Number),
          size_of_content: expect.any(Number),
        });

        const deleteRes = await request(app)
          .delete(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(deleteRes.statusCode).toBe(204);
        const getRes2 = await request(app)
          .get(`/api/v3/projects/${dynamicTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes2.statusCode).toBe(404);
      });

      test("create draft project with slug only", async () => {
        // Create a new project with only a slug
        const TEST_APP_ID = `test_app_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${TEST_APP_ID}`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send();
        expect(postRes.statusCode).toBe(204);

        // Verify the project was created with the correct slug
        const getRes = await request(app)
          .get(`/api/v3/projects/${TEST_APP_ID}/draft`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.slug).toBe(TEST_APP_ID);
      });
    });

    describe("/api/v3/projects/{slug}/publish", () => {
      test("publish version and change metadata", async () => {
        // Create a new project
        const publishTestAppId = `test_app_publish_${Date.now()}`;
        const postRes = await request(app)
          .post(`/api/v3/projects/${publishTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send();
        expect(postRes.statusCode).toBe(204);

        // Add metadata to the project
        const updateAppRes = await request(app)
          .patch(`/api/v3/projects/${publishTestAppId}/draft/metadata`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send({
            description: "Test App Description Before Publish",
          });
        expect(updateAppRes.status).toBe(204);

        // Verify the metadata was added
        const getRes1 = await request(app)
          .get(`/api/v3/projects/${publishTestAppId}/draft`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getRes1.statusCode).toBe(200);
        expect(getRes1.body.version.app_metadata.description).toBe(
          "Test App Description Before Publish"
        );

        // Publish the project to create a new version
        const publishRes = await request(app)
          .patch(`/api/v3/projects/${publishTestAppId}/publish`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(publishRes.statusCode).toBe(204);

        // Update the metadata of the draft version after publishing
        const updateAppRes2 = await request(app)
          .patch(`/api/v3/projects/${publishTestAppId}/draft/metadata`)
          .auth(USER1_TOKEN, { type: "bearer" })
          .send({
            description: "Test App Description After Publish",
          });
        expect(updateAppRes2.status).toBe(204);

        // Verify the metadata was updated on the draft version
        const getDraftRes = await request(app)
          .get(`/api/v3/projects/${publishTestAppId}/draft`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getDraftRes.statusCode).toBe(200);
        expect(getDraftRes.body.name).toBe(publishTestAppId);
        expect(getDraftRes.body.version.app_metadata.description).toBe(
          "Test App Description After Publish"
        );

        // Verify the metadata of the published version remains unchanged
        const getLatestRes = await request(app)
          .get(`/api/v3/projects/${publishTestAppId}`)
          .auth(USER1_TOKEN, { type: "bearer" });
        expect(getLatestRes.statusCode).toBe(200);
        expect(getLatestRes.body.name).toBe(publishTestAppId);
        expect(getLatestRes.body.version.app_metadata.description).toBe(
          "Test App Description Before Publish"
        );
      });
    });
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);

function stripId<T extends { id?: unknown } | object>(
  stripDatedData1: T
): Omit<T, "id"> {
  const { id, ...rest } = stripDatedData1 as { id?: unknown };
  return rest as Omit<T, "id">;
}
