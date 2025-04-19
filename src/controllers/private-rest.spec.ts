import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import { createExpressServer } from "@createExpressServer";
import { isInDebugMode } from "@util/debug";

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
  },
  { timeout: isInDebugMode() ? 3600_000 : undefined }
);
