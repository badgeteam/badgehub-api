import React, { use } from "react";

export interface User {
  name: string;
  email: string;
  id: string;
  token: string;
}

interface SessionContextType {
  user?: User;
  keycloak?: Keycloak.KeycloakInstance;
}

export const SessionContext = React.createContext<SessionContextType>({});
export const useSession = () => use(SessionContext);
