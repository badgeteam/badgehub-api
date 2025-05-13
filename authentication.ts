import * as express from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { JwtError } from "@controllers/public-rest";
import { KEYCLOAK_CERTS, KEYCLOAK_ISSUER } from "./src/config";

// Create a JWKS client using Keycloak's JWKS endpoint
const JWKS = createRemoteJWKSet(new URL(KEYCLOAK_CERTS!));

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  // Enable logging for debugging:
  // console.log("authorization", request.header("authorization"));
  // console.log("securityName", securityName);
  // console.log("scopes", scopes);

  if (securityName !== "bearer") {
    throw new Error(`Unsupported security scheme: ${securityName}`);
  }

  const authHeader = request.header("authorization");

  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer != "Bearer" || !token || token == "undefined") {
    throw new Error("Not authenticated");
  }

  try {
    // Verify the JWT
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: KEYCLOAK_ISSUER,
      // audience: AUDIENCE,
      // Add other validation options as needed
    });

    // Check if token has the required scopes/roles
    // if (scopes && scopes.length > 0) {
    //   const tokenScopes: string[] = payload.scope?.split(' ') || [];
    //   const hasRequiredScopes = scopes.every(scope => tokenScopes.includes(scope));
    //
    //   if (!hasRequiredScopes) {
    //     throw createJwtError("Insufficient permissions", 403);
    //   }
    // }

    // Return the payload as the authenticated user
    return payload;
  } catch (error) {
    console.error("Authentication error:", error);
    throw createJwtError("Authentication failed");
  }
}

function createJwtError(message: string, status = 401): JwtError {
  return {
    status,
    name: status === 401 ? "Unauthorized" : "Forbidden",
    message,
  };
}
