import { ErrorType, NotAuthenticatedError } from "@error";
import { decodeJwt } from "jose";
import { NextFunction, Request, Response } from "express";
import { User } from "@domain/readModels/project/User";
export type UserDataInRequest = Pick<User, "idp_user_id">;

export type RequestWithUser = {
  user: UserDataInRequest;
} & Request;

export function getUser(req: { user: UserDataInRequest }): UserDataInRequest {
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
  req: { headers: { authorization?: string } },
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

const handleError = (err: unknown, res: Response) => {
  if (err && typeof err === "object" && "name" in err && "message" in err) {
    if (err.name == ErrorType.NotAuthorized) {
      res.status(403).json({ reason: err.message });
      return;
    }
    if (err.name == ErrorType.NotAuthenticated) {
      res.status(401).json({ reason: err.message });
      return;
    }
  }
  console.warn("JWT:handleError: Internal server error", err);
  res.status(500).json({ reason: "Internal server error" });
};

export { addUserSubMiddleware };
