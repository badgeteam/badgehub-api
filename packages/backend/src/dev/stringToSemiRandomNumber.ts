import { subtle } from "node:crypto";

export const stringToSemiRandomNumber = async (inputString: string) => {
  const ec = new TextEncoder();
  const msgUint8 = ec.encode(inputString);
  const digest = await subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(digest)); // convert buffer to byte array
  return hashArray
    .slice(-10) // 10 is enough
    .reduce((prev, curr, index) => prev + curr * 8 ** index, 0);
};
