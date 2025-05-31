import { subtle } from "node:crypto";
import { UploadedFile } from "@shared/domain/UploadedFile";

export async function calcSha256(uploadedFile: UploadedFile): Promise<string> {
  const digest = await subtle.digest("SHA-256", uploadedFile.fileContent);
  const hashArray = Array.from(new Uint8Array(digest)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
