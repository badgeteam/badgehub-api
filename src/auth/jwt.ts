import { ErrorType, NotAuthenticatedError, NotAuthorizedError } from "../error";
import { isAdmin, isContributor, UserRole } from "./role";
import { JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";

// Middleware for routes that require a contributor role
const ensureAdminRouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await handleMiddlewareCheck(req, res, ensureAdmin);

  next();
};

// Middleware for routes that require a contributor role
const ensureContributorRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleMiddlewareCheck(req, res, ensureContributor).then(next);
};

const handleMiddlewareCheck = async (
  req: Request,
  res: Response,
  assertion: Function
) => {
  try {
    const token = await decodeJwtFromRequest(req);
    const roles: UserRole[] = rolesFromJwtPayload(token);

    console.debug("Roles:", roles);
    if (roles.length == 0) {
      throw NotAuthorizedError();
    }
    assertion(roles);
  } catch (e: any) {
    handleError(e, res);
  }
};

const handleError = (err: Error, res: Response) => {
  if (err.name == ErrorType.NotAuthenticated) {
    res.status(403).json({ error: err.message });
  }
  if (err.name == ErrorType.NotAuthorized) {
    res.status(401).json({ error: err.message });
  }

  console.debug(err);
  res.status(500).json({ error: "Internal server error" });
};

const ensureAdmin = (roles: UserRole[]) => {
  roles.forEach((role) => {
    if (!isAdmin(role)) {
      throw NotAuthorizedError();
    }
  });
};

const ensureContributor = (roles: UserRole[]) => {
  roles.forEach((role) => {
    if (!isContributor(role)) {
      throw NotAuthorizedError();
    }
  });
};

const rolesFromJwtPayload = (payload: JWTPayload): UserRole[] => {
  const aud = payload.aud;

  if (!aud) {
    return [];
  }

  if (typeof aud == "string") {
    return [UserRole[aud as UserRole]];
  }

  return (aud as string[]).map((i: string) => {
    return UserRole[i as UserRole];
  });
};

const decodeJwtFromRequest = async (req: Request): Promise<JWTPayload> => {
  const token = req.headers.authorization;

  if (!token) {
    throw NotAuthenticatedError("missing API token");
  }

  try {
    const result = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SIGNING_KEY)
    );
    const payload = result.payload;
    if (!Object.hasOwn(payload, "aud")) {
      throw NotAuthenticatedError("API token invalid");
    }

    return payload;
  } catch (err) {
    throw NotAuthenticatedError("API token invalid");
  }
};

export { ensureAdminRouteMiddleware, ensureContributorRouteMiddleware };
