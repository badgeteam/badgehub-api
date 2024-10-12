import jwt from "jsonwebtoken";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    // console.log("REQUEST", request);

    const pubkey = process.env.KEYCLOAK_PUBKEY;

    if (!pubkey) {
      reject(new Error("KEYCLOAK_PUBKEY environment variable not set"));
      return;
    }

    if (securityName !== "jwt") {
      reject(new Error("Not JWT"));
    }

    // TODO
    const bearer = (request.headers as unknown as { [index: string]: string })
      .authorization;

    if (!bearer) {
      reject(new Error("No bearer provided"));
      return;
    }

    const token = bearer.split(" ")?.[1];

    console.log("########### token", token);

    if (!token) {
      reject(new Error("No token provided"));
      return;
    }

    // TODO move secret to envvar
    jwt.verify(
      token,
      pubkey,
      { algorithms: ["RS256"] },
      (err: any, decoded: any) => {
        console.log("verify", err, decoded);
        if (err) {
          reject(err);
        } else {
          // // Check if JWT contains all required scopes
          // for (let scope of scopes) {
          //   if (!decoded.scopes.includes(scope)) {
          //     reject(new Error("JWT does not contain required scope."));
          //   }
          // }
          console.log("!!! AUTHENTICATED !!!");
          resolve(decoded);
        }
      }
    );
  });
}
