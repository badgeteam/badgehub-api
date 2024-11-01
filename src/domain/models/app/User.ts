import { DatedData } from "./DatedData";
import { Project, ProjectRelation } from "./Project";
type WebauthnKey = unknown; // TODO

export interface UserRelation {
  user_id: number;
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
  projects_count?: number;
  votes: Array<Vote>;
  votes_count?: number;
  warnings: Array<Warning>;
  warnings_count?: number;
  webauthnKeys: Array<WebauthnKey>;
  webauthn_keys_count?: number;
  collaborations: Array<Project>;
  collaborations_count?: number;
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
