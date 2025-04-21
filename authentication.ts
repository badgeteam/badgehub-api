import * as express from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.log("authorization", request.header("authorization"));
  console.log("securityName", securityName);
  console.log("scopes", scopes);

  return new Promise(async (resolve, reject) => {
    const authHeader = request.header("authorization");

    if (!authHeader) {
      reject(new Error("Authorization header is missing"));
      return;
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer != "Bearer" || !token || token == "undefined") {
      reject(new Error("Not authenticated"));
      return;
    }

    console.log("token", token);

    // Create a JWKS client using Keycloak's JWKS endpoint
    const JWKS = createRemoteJWKSet(
      new URL(
        "https://lemur-11.cloud-iam.com/auth/realms/badgehub/protocol/openid-connect/certs"
      )
    );

    try {
      // Verify the JWT
      const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
        issuer: "https://lemur-11.cloud-iam.com/auth/realms/badgehub",
      });
      console.log("payload", payload);
      console.log("protectedHeader", protectedHeader);

      resolve(`{"status": 200}`);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
