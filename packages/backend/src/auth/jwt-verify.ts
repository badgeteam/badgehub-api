import { createRemoteJWKSet, jwtVerify } from "jose";
import { DISABLE_AUTH, KEYCLOAK_CERTS } from "@config";
import { NextFunction, Response } from "express";

const JWKS = createRemoteJWKSet(new URL(KEYCLOAK_CERTS!));

async function jwtVerifyTokenMiddleware(
  req: { headers: { authorization?: string } },
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (
    bearer !== "Bearer" ||
    !token ||
    token.trim() === "" ||
    token === "undefined"
  ) {
    return res.status(401).json({ reason: "Not authenticated" });
  }
  try {
    await jwtVerifyToken(token);
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ reason: "JWT verification failed" });
  }
}

async function jwtVerifyToken(token: string) {
  if (DISABLE_AUTH) {
    return;
  }
  try {
    await jwtVerify(token, JWKS, {
      issuer: process.env.KEYCLOAK_ISSUER,
      algorithms: ["RS256"],
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    throw new Error("JWT verification failed");
  }
}

export { jwtVerifyTokenMiddleware };
