import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import { RegisterRoutes } from "@generated/routes";
import express from "express";

describe("API Routes", () => {
  let app: ReturnType<typeof express>;
  beforeEach(() => {
    app = express();
  });
  test("GET /vitest", async () => {
    RegisterRoutes(app);
    const res = await request(app).get("/api/v3/devices");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty("name", "mch2022");
  });
});
