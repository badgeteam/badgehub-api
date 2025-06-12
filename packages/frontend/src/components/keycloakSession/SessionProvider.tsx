// Simulate a user type
import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import {
  SessionContext,
  User,
} from "@components/keycloakSession/SessionContext.tsx";

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

    const KEYCLOAK_URL = "https://keycloak.p1m.nl";
    const KEYCLOAK_REALM = "master";
    const KEYCLOAK_CLIENT_ID = "badgehub-api-frontend";

    const kc = new Keycloak({
      url: KEYCLOAK_URL,
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT_ID,
    });
    setKeycloak(kc);

    kc.init({
      checkLoginIframe: false,
      pkceMethod: "S256",
    })
      .then((authenticated) => {
        if (authenticated && kc.tokenParsed) {
          setUser({
            name:
              kc.tokenParsed.name ||
              kc.tokenParsed.preferred_username ||
              "User",
            email: kc.tokenParsed.email || "",
          });
        } else {
          setUser(undefined);
        }
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setUser(undefined);
      });
  }, []);

  return <SessionContext value={{ user, keycloak }}>{children}</SessionContext>;
};
