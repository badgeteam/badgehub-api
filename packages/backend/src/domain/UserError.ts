export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export class ProjectAlreadyExistsError extends UserError {
  constructor(slug: string) {
    super(`Project with slug '${slug}' already exists`);
    this.name = "ProjectAlreadyExistsError";
  }
}
