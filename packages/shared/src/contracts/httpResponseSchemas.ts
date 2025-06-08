import { z } from "zod";

export const notFoundSchema = z
  .object({ reason: z.string() })
  .describe("Requested resource not Found");
