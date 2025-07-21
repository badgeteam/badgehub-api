import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";
import {
  BADGEHUB_FRONTEND_BASE_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_URL,
} from "@config.ts";
import {
  SessionContext,
  User,
} from "@sharedComponents/keycloakSession/SessionContext.tsx";

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [keycloak, setKeycloak] = useState<Keycloak | undefined>(undefined);
  const initialized = useRef(false);

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

  // Token refresh logic
  useEffect(() => {
    if (!keycloak || !keycloak.authenticated) return;

    // Set up token expiration handler
    keycloak.onTokenExpired = async () => {
      try {
        const refreshed = await keycloak.updateToken(5);
        if (refreshed) {
          setUser((prevUser) =>
            prevUser
              ? {
                  ...prevUser,
                }
              : undefined
          );
        }
      } catch (error) {
        console.error("Session expired, redirecting to login", error);
        keycloak.login();
      }
    };

    return () => {
      keycloak.onTokenExpired = undefined;
    };
  }, [keycloak]);

  return <SessionContext value={{ user, keycloak }}>{children}</SessionContext>;
};
