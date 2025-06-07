import { describe, expect, it } from "vitest";
import { UploadedFile } from "@shared/domain/UploadedFile";
import { calcSha256 } from "@util/sha256";

describe("sha256", () => {
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
