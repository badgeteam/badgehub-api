import { describe, it, expect } from "vitest";
import { calcSha256, getLockId } from "@util/digests";
import { UploadedFile } from "@domain/UploadedFile";

describe("digests", () => {
  describe("getLockId", () => {
    it("lock id should be deterministic", async () => {
      const result = await getLockId("test", "a", "b", "c");
      expect(result).toEqual(await getLockId("test", "a", "b", "c"));
    });
    it("lock id should be different for different project", async () => {
      const result = await getLockId("test", "a", "b", "c");
      expect(result).not.toEqual(await getLockId("test2", "a", "b", "c"));
    });
    it("lock id should be different for different dir", async () => {
      const result = await getLockId("test", "a", "b", "c");
      expect(result).not.toEqual(await getLockId("test", "a2", "b", "c"));
    });
    it("lock id should be different for different name", async () => {
      const result = await getLockId("test", "a", "b", "c");
      expect(result).not.toEqual(await getLockId("test", "a", "b2", "c"));
    });
    it("lock id should be different for different ext", async () => {
      const result = await getLockId("test", "a", "b", "c");
      expect(result).not.toEqual(await getLockId("test", "a", "b", "c2"));
    });
  });

  describe("calcSha256", () => {
    it("sha256 should match result from https://emn178.github.io/online-tools/sha256.html", async () => {
      const result = await calcSha256({
        fileContent: new TextEncoder().encode("this is a test"),
      } as UploadedFile);
      expect(result).toEqual(
        "2e99758548972a8e8822ad47fa1017ff72f06f3ff6a016851f45c398732bc50c"
      );
    });
  });
});
