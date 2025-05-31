import { subtle } from "node:crypto";
import { UploadedFile } from "@domain/UploadedFile";

export const stringToNumberDigest = async (inputString: string) => {
  const ec = new TextEncoder();
  const msgUint8 = ec.encode(inputString);
  const digest = await subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(digest)); // convert buffer to byte array
  return hashArray
    .slice(-51 / 3) // Js max safe integer is 2^53 - 1, so has 53 bits. each uint8 has 3 bits so we round down to be divisible by 3
    .reduce((prev, curr, index) => prev + curr * 8 ** index, 0);
};

export async function calcSha256(uploadedFile: UploadedFile): Promise<string> {
  const digest = await subtle.digest("SHA-256", uploadedFile.fileContent);
  const hashArray = Array.from(new Uint8Array(digest)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
