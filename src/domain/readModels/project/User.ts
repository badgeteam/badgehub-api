import { DatedData } from "./DatedData";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  id: number;
  email: string; // TODO probably delete, should probably also be managed by keycloak
  admin: boolean; // TODO probably delete, this is a role and should probably be managed by keycloak
  name: string; // TODO probably delete, should probably also be managed by keycloak
  password: string; // TODO delete, should be managed by keycloak
  remember_token?: string; // TODO probably delete, should probably also be managed by keycloak
  editor: string; // TODO probably delete, this is a role and should probably be managed by keycloak
  public: boolean; // TODO check if we want to manage this in keycloack or not
  show_projects: boolean; // TODO check if we want to manage this in keycloack or not
  email_verified_at?: Date; // TODO probably delete, should probably be managed by keycloak
}
