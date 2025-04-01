import * as express from "express";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log("request", request.headers);
  console.log("authorization", request.header("authorization"));
  console.log("securityName", securityName);
  console.log("scopes", scopes);

  return new Promise((resolve, reject) => {
    resolve({ status: "okay" });
  });
}
