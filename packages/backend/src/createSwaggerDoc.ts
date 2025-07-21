import { generateOpenApi } from "@ts-rest/open-api";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";
import { privateRestContracts } from "@shared/contracts/privateRestContracts";
import _ from "lodash";
import {
  OpenAPIObject,
  OperationObject,
  ParameterObject,
  ReferenceObject,
} from "openapi3-ts";
import { initContract } from "@ts-rest/core";

const c = initContract();
export const swaggerJsonContract = c.router({
  getSwaggerDoc: {
    method: "GET",
    path: "/api-docs/swagger.json",
    responses: {
      200: c.type<OpenAPIObject>(),
    },
  },
});

function withPrefix(prefix: string, paths: Record<string, any>) {
  const prefixedPaths: Record<string, any> = {};
  for (const [path, value] of Object.entries(paths)) {
    prefixedPaths[`${prefix}${path}`] = value;
  }
  return prefixedPaths;
}

const withTag = (operation: OperationObject, tag: string) => ({
  ...operation,
  tags: [...(operation.tags ?? []), tag],
});
const isAuthorizationHeader = (p: ParameterObject | ReferenceObject) => {
  return (
    "in" in p &&
    p.in === "header" &&
    "name" in p &&
    p.name?.toLowerCase() === "authorization"
  );
};
const withSecurity = (operation: OperationObject) => ({
  ...operation,
  // Remove authorization headers from parameters because they are handled by the security scheme and need to be filled in at the top
  parameters: operation.parameters?.filter((p) => !isAuthorizationHeader(p)),
  security: [{ bearer: ["private"] }],
});
export const createSwaggerDoc = () => {
  const apiDoc = { info: { title: "BadgeHub API", version: "1.0.0" } };
  const jsonSwagger = generateOpenApi(swaggerJsonContract, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withTag(op, "Open API"),
  });
  const publicSwagger = generateOpenApi(publicRestContracts, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withTag(op, "Public"),
  });
  const privateSwagger = generateOpenApi(privateRestContracts, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withSecurity(withTag(op, "Private")),
  });

  return {
    ...jsonSwagger,
    paths: _.merge(
      jsonSwagger.paths,
      withPrefix("/api/v3", publicSwagger.paths),
      withPrefix("/api/v3", privateSwagger.paths)
    ),
    tags: [
      {
        name: "Open API",
        description: "Operations allowing to download the open api spec.",
      },
      {
        name: "Public",
        description: "Operations available without any authentication.",
      },
      {
        name: "Private",
        description: "Operations available to authenticated users.",
      },
    ],
    servers: [
      { url: "/" },
      { url: "https://badgehub-api.p1m.nl/" },
      { url: "https://localhost:8081/" },
    ],
    components: {
      ...jsonSwagger.components,
      securitySchemes: {
        bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  } as const satisfies OpenAPIObject;
};
