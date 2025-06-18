// Simulate a user type
import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import {
  SessionContext,
  User,
} from "@sharedComponents/keycloakSession/SessionContext.tsx";
import {
  BADGEHUB_FRONTEND_BASE_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_URL,
} from "@config.ts";

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [keycloak, setKeycloak] = useState<
    Keycloak.KeycloakInstance | undefined
  >(undefined);
  const initialized = React.useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const kc = new Keycloak({
      url: KEYCLOAK_URL,
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT_ID,
    });

    kc.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      silentCheckSsoRedirectUri: `${BADGEHUB_FRONTEND_BASE_URL}/silent-check-sso.html`,
    })
      .then((authenticated) => {
        if (authenticated && kc.tokenParsed) {
          setUser({
            name:
              kc.tokenParsed.name ||
              kc.tokenParsed.preferred_username ||
              "User",
            email: kc.tokenParsed.email || "",
            id: kc.tokenParsed.sub || "",
            token: kc.token || "",
          });
        } else {
          setUser(undefined);
        }
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setUser(undefined);
      })
      .finally(() => {
        setKeycloak(kc);
      });
  }, []);

  return <SessionContext value={{ user, keycloak }}>{children}</SessionContext>;
};
