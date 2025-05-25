import { ErrorType, NotAuthenticatedError, NotAuthorizedError } from "@error";
import { isAdmin, isContributor, UserRole } from "@auth/role";
import { decodeJwt, JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { User } from "@domain/readModels/project/User";

// Middleware for routes that require a contributor role
const ensureAdminRouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return handleMiddlewareCheck(req, res, ensureAdmin, next);
};

export type RequestWithUser = {
  user: Pick<User, "idp_user_id">;
} & Request;

export function getUser(req: RequestWithUser): Pick<User, "idp_user_id"> {
  return req.user;
}

const decodeTokenWithErrorHandling = (token: string) => {
  try {
    return decodeJwt(token);
  } catch (e) {
    console.warn(
      "JWT:decodeTokenWithErrorHandling: Unable to decodeJwt JWT token, error:",
      e
    );
    throw NotAuthenticatedError("Unable to decode JWT token: " + e);
  }
};

const addUserSubMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      console.warn("JWT:addUserSubMiddleware: Missing authorization header");
      throw NotAuthenticatedError("Missing authorization header");
    }
    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.substring("Bearer ".length);
    }
    const payload = decodeTokenWithErrorHandling(token);
    if (!("sub" in payload) || !payload.sub) {
      console.warn(
        "JWT:addUserSubMiddleware: payload does not contain user sub"
      );
      throw NotAuthenticatedError("JWT does not contain user sub");
    }
    (req as RequestWithUser).user = { idp_user_id: payload.sub };
    next();
  } catch (e: unknown) {
    return handleError(e, res);
  }
};
// Middleware for routes that require a contributor role
const ensureContributorRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return handleMiddlewareCheck(req, res, ensureContributor, next);
};

const handleMiddlewareCheck = async (
  req: Request,
  res: Response,
  assertion: Function,
  next: NextFunction
) => {
  try {
    const token = await decodeJwtFromRequest(req);
    const roles: UserRole[] = rolesFromJwtPayload(token);

    console.debug("JWT:handleMiddlewareCheck: " + "Roles:", roles);
    if (roles.length == 0) {
      console.warn(
        "JWT:handleMiddlewareCheck: " +
          "No roles found in JWT payload, token" +
          token
      );
      throw NotAuthorizedError();
    }
    assertion(roles);
    next();
  } catch (e: any) {
    handleError(e, res);
  }
};

const handleError = (err: unknown, res: Response) => {
  if (err && typeof err === "object" && "name" in err && "message" in err) {
    if (err.name == ErrorType.NotAuthorized) {
      res.status(403).json({ error: err.message });
      return;
    }
    if (err.name == ErrorType.NotAuthenticated) {
      res.status(401).json({ error: err.message });
      return;
    }
  }
  console.warn("JWT:handleError: Internal server error", err);
  res.status(500).json({ error: "Internal server error" });
};

const ensureAdmin = (roles: UserRole[]) => {
  if (roles.find(isAdmin)) {
    console.warn(
      `JWT:ensureAdmin: No Admin role found for user, roles: ${roles.join(",")}`
    );
    throw NotAuthorizedError("No Admin role found for user");
  }
};

const ensureContributor = (roles: UserRole[]) => {
  if (roles.find(isContributor)) {
    console.warn(
      `JWT:ensureContributor: No Contributor role found for user, roles: ${roles.join(",")}`
    );
    throw NotAuthorizedError("No Contributor role found for user");
  }
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
    console.warn(
      "JWT:decodeJwtFromRequest: " + "No authorization header found in request"
    );
    throw NotAuthenticatedError("No authorization header found in request");
  }

  try {
    const result = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SIGNING_KEY)
    );
    const payload = result.payload;
    if (!Object.hasOwn(payload, "aud")) {
      console.warn(
        "JWT:decodeJwtFromRequest: " + "API token invalid, no 'aud' in payload"
      );
      throw NotAuthenticatedError("API token invalid, no 'aud' in jwt payload");
    }

    return payload;
  } catch (err) {
    console.warn("JWT:decodeJwtFromRequest: catch error", err);
    throw NotAuthenticatedError(
      "API token invalid, could not verify JWT token"
    );
  }
};

export {
  ensureAdminRouteMiddleware,
  ensureContributorRouteMiddleware,
  addUserSubMiddleware,
};
