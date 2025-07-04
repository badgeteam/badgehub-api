import React, { use } from "react";
import Keycloak from "keycloak-js";

export interface User {
  name: string;
  email: string;
  id: string;
}

interface SessionContextType {
  user?: User;
  keycloak?: Keycloak;
}

export const SessionContext = React.createContext<SessionContextType>({});
export const useSession = () => use(SessionContext);
