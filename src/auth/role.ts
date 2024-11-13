enum UserRole {
  Admin = "Admin",
  Contributor = "Contributor",
  ReadOnlyUser = "ReadOnlyUser",
}

const isAdmin = (role: UserRole): boolean => {
  return role == UserRole.Admin;
};

const isContributor = (role: UserRole): boolean => {
  return role == UserRole.Contributor || isAdmin(role);
};

export { UserRole, isAdmin, isContributor };
