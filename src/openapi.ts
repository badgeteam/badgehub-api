import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { generateOpenApi } from "@ts-rest/open-api";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";
import { privateRestContracts } from "@shared/contracts/privateRestContracts";
import { initContract } from "@ts-rest/core";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { OpenAPIObject, OperationObject } from "openapi3-ts";

const c = initContract();
const swaggerJsonContract = c.router({
  getSwaggerDoc: {
    method: "GET",
    path: "/openapi/swagger.json",
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

const withSecurity = (operation: OperationObject) => ({
  ...operation,
  security: [
    {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  ],
});

const createSwaggerDoc = () => {
  const apiDoc = { info: { title: "BadgeHub API", version: "1.0.0" } };
  const jsonSwagger = generateOpenApi({ ...swaggerJsonContract }, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withTag(op, "Open API"),
  });
  const publicSwagger = generateOpenApi({ ...publicRestContracts }, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withTag(op, "Public"),
  });
  const privateSwagger = generateOpenApi(privateRestContracts, apiDoc, {
    setOperationId: true,
    operationMapper: (op) => withSecurity(withTag(op, "Private")),
  });

  return {
    ...jsonSwagger,
    paths: {
      ...jsonSwagger.paths,
      ...withPrefix("/api/v3", publicSwagger.paths),
      ...withPrefix("/api/v3", privateSwagger.paths),
    },
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
  };
};
const swaggerDoc = createSwaggerDoc();

export default function openapi(app: Express) {
  const swaggerJsonRouter = initServer().router(swaggerJsonContract, {
    getSwaggerDoc: async () => ({
      status: 200,
      body: swaggerDoc,
    }),
  });
  createExpressEndpoints(swaggerJsonContract, swaggerJsonRouter, app);
  const options = {
    swaggerOptions: { url: "/openapi/swagger.json" },
  };
  app.use(
    "/openapi",
    swaggerUi.serveFiles(undefined, options),
    swaggerUi.setup(undefined, options)
  );
}
