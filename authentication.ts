import * as express from "express";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log("authorization", request.header("authorization"));
  console.log("securityName", securityName);
  console.log("scopes", scopes);

  const authHeader = request.header("authorization");

  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer != "Bearer" || !token || token == "undefined") {
    throw new Error("Not authenticated");
  }

  console.log("token", token);

  return Promise.resolve({ status: "okay" });
}
