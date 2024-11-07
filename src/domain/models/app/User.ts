import { DatedData } from "./DatedData";
import { Project, ProjectRelation } from "./Project";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  id: number;
  admin: boolean;
  name: string;
  email: string;
  password: string;
  remember_token?: string;
  editor: string;
  public: boolean;
  show_projects: boolean;
  google2fa_enabled: boolean;
  google2fa_secret?: string;
  email_verified_at?: Date;

  // Relations
  projects: Array<Project>;
  votes: Array<Vote>;
  warnings: Array<Warning>;
  collaborations: Array<Project>;
}

export interface Vote extends UserRelation, ProjectRelation, DatedData {
  id: number;
  type: "up" | "down" | "pig";
  comment?: string;
}

export interface Warning extends UserRelation, ProjectRelation, DatedData {
  id: number;
  description: string;
}
