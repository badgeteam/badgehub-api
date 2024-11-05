import { DatedData } from "./DatedData";
import { Project, ProjectRelation } from "./Project";
export type UserId = string;
export interface UserRelation {
  user_id: UserId;
}

export interface WebauthnKey {
  // TODO
}

export interface User extends DatedData {
  id: UserId;
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
  webauthn_keys_count?: number;
  collaborations: Array<Project>;
  collaborations_count?: number;
}

type VoteId = string;

export interface Vote extends UserRelation, ProjectRelation, DatedData {
  id: VoteId;
  type: "up" | "down" | "pig";
  comment?: string;
}

export interface Warning extends UserRelation, ProjectRelation, DatedData {
  id: number;
  description: string;
}
