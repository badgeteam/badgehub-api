import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("API Routes", () => {
  test("GET /vitest", async () => {
    const res = await request(app).get("/api/v3/devices");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty("name", "mch2022");
  });
});
