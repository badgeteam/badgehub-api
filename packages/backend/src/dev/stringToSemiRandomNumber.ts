import { subtle } from "node:crypto";

export const stringToSemiRandomNumber = async (inputString: string) => {
  const ec = new TextEncoder();
  const msgUint8 = ec.encode(inputString);
  const digest = await subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(digest)); // convert buffer to byte array
  return hashArray
    .slice(-51 / 3) // Js max safe integer is 2^53 - 1, so has 53 bits. each uint8 has 3 bits so we round down to be divisible by 3
    .reduce((prev, curr, index) => prev + curr * 8 ** index, 0);
};
