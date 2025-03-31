import { ErrorType, NotAuthenticatedError, NotAuthorizedError } from "@error";
import { isAdmin, isContributor, UserRole } from "./role";
import { createRemoteJWKSet, JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";

export const testJwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorized = await isAuthorized(req.headers.authorization);

  console.log("authorized", authorized);
  next();
};

async function isAuthorized(authorization?: string) {
  if (!authorization) {
    return false;
  }
  const [bearer, jwt] = authorization.split(" ");

  if (bearer != "Bearer" || !jwt || jwt == "undefined") {
    return false;
  }

  console.log("bearer", bearer);
  console.log("token", jwt);

  // See     https://github.com/panva/jose/blob/main/docs/jwt/verify/functions/jwtVerify.md
  // Key     https://lemur-11.cloud-iam.com/auth/realms/badgehub
  // https://lemur-11.cloud-iam.com/auth/realms/badgehub/protocol/openid-connect/certs
  // Account https://lemur-11.cloud-iam.com/auth/realms/badgehub/account/

  // Create a JWKS client using Keycloak's JWKS endpoint
  const JWKS = createRemoteJWKSet(
    new URL(
      "https://lemur-11.cloud-iam.com/auth/realms/badgehub/protocol/openid-connect/certs"
    )
  );

  // Verify the JWT
  const { payload, protectedHeader } = await jwtVerify(jwt, JWKS, {
    issuer: "https://lemur-11.cloud-iam.com/auth/realms/badgehub",
  });

  console.log("payload", payload);
  console.log("protectedHeader", protectedHeader);

  return true;
}
