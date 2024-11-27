import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app";
import { RegisterRoutes } from "@generated/routes";

describe("API Routes", () => {
  test("GET /vitest", async () => {
    RegisterRoutes(app);
    const res = await request(app).get("/api/v3/devices");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty("name", "mch2022");
  });
});
