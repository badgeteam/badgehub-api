enum ErrorType {
  NotAuthorized = "ERROR_NOT_AUTHORIZED",
  NotAuthenticated = "ERROR_NOT_AUTHENTICATED",
}

class BadgeHubApiError extends Error {
  override name: ErrorType;
  override message: string;
  override cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorType;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

const NotAuthenticatedError = (
  message: string = "You are not authenticated"
): BadgeHubApiError => {
  return new BadgeHubApiError({ name: ErrorType.NotAuthenticated, message });
};

const NotAuthorizedError = (
  message: string = "You are not authorized"
): BadgeHubApiError => {
  return new BadgeHubApiError({ name: ErrorType.NotAuthorized, message });
};

export {
  ErrorType,
  BadgeHubApiError,
  NotAuthorizedError,
  NotAuthenticatedError,
};
