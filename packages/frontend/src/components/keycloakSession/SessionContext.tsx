import Keycloak from "keycloak-js";
import React, { useContext } from "react";

export interface User {
  name: string;
  email: string;
}

interface SessionContextType {
  user?: User;
  keycloak?: Keycloak.KeycloakInstance;
}

export const SessionContext = React.createContext<SessionContextType>({});
export const useSession = () => useContext(SessionContext);
