/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from "@tsoa/runtime";
import { fetchMiddlewares, ExpressTemplateService } from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PublicRestController } from "./../controllers/public-rest.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PrivateRestController } from "./../controllers/private-rest.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DevRestController } from "./../controllers/dev-rest.js";
import { expressAuthentication } from "./../../authentication.js";
// @ts-ignore - no great way to install types from subpackage
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from "express";
import multer from "multer";

const expressAuthenticationRecasted = expressAuthentication as (
  req: ExRequest,
  securityName: string,
  scopes?: string[],
  res?: ExResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  JwtError: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      message: { dataType: "string", required: true },
      stack: { dataType: "string" },
      status: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Badge: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      name: { dataType: "string", required: true },
      slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AppCategoryName: {
    dataType: "refAlias",
    type: {
      dataType: "union",
      subSchemas: [
        { dataType: "enum", enums: ["Uncategorised"] },
        { dataType: "enum", enums: ["Event related"] },
        { dataType: "enum", enums: ["Games"] },
        { dataType: "enum", enums: ["Graphics"] },
        { dataType: "enum", enums: ["Hardware"] },
        { dataType: "enum", enums: ["Utility"] },
        { dataType: "enum", enums: ["Wearable"] },
        { dataType: "enum", enums: ["Data"] },
        { dataType: "enum", enums: ["Silly"] },
        { dataType: "enum", enums: ["Hacking"] },
        { dataType: "enum", enums: ["Troll"] },
        { dataType: "enum", enums: ["Unusable"] },
        { dataType: "enum", enums: ["Adult"] },
        { dataType: "enum", enums: ["Virus"] },
        { dataType: "enum", enums: ["SAO"] },
        { dataType: "enum", enums: ["Interpreter"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Category: {
    dataType: "refObject",
    properties: {
      name: { ref: "AppCategoryName", required: true },
      slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_Project.Exclude_keyofProject.version__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        name: { dataType: "string" },
        min_firmware: { dataType: "double" },
        max_firmware: { dataType: "double" },
        git_commit_id: { dataType: "string" },
        published_at: { dataType: "datetime" },
        license: { dataType: "string" },
        category: { ref: "AppCategoryName", required: true },
        description: { dataType: "string" },
        revision: { dataType: "double" },
        interpreter: { dataType: "string" },
        badges: { dataType: "array", array: { dataType: "string" } },
        slug: { dataType: "string", required: true },
        idp_user_id: { dataType: "string", required: true },
        git: { dataType: "string" },
        allow_team_fixes: { dataType: "boolean" },
        created_at: { dataType: "datetime", required: true },
        updated_at: { dataType: "datetime", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_Project.version_": {
    dataType: "refAlias",
    type: {
      ref: "Pick_Project.Exclude_keyofProject.version__",
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectWithoutVersion: {
    dataType: "refAlias",
    type: { ref: "Omit_Project.version_", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RevisionNumber: {
    dataType: "refAlias",
    type: { dataType: "double", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FileMetadata: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      dir: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      ext: { dataType: "string", required: true },
      mimetype: { dataType: "string", required: true },
      size_of_content: { dataType: "double", required: true },
      sha256: { dataType: "string", required: true },
      size_formatted: { dataType: "string", required: true },
      full_path: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_Badge-at-slug.string_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      additionalProperties: { dataType: "string" },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_Badge-at-slug.Array__source-string--destination-string___": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      additionalProperties: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            destination: { dataType: "string", required: true },
            source: { dataType: "string", required: true },
          },
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AppMetadataJSON: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string" },
      description: { dataType: "string" },
      category: { ref: "AppCategoryName" },
      author: { dataType: "string" },
      icon: { dataType: "string" },
      license_file: { dataType: "string" },
      is_library: { dataType: "boolean" },
      is_hidden: { dataType: "boolean" },
      semantic_version: { dataType: "string" },
      interpreter: { dataType: "string" },
      main_executable: { dataType: "string" },
      main_executable_overrides: { ref: "Record_Badge-at-slug.string_" },
      file_mappings: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            destination: { dataType: "string", required: true },
            source: { dataType: "string", required: true },
          },
        },
      },
      file_mappings_overrides: {
        ref: "Record_Badge-at-slug.Array__source-string--destination-string___",
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Version: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      revision: { ref: "RevisionNumber", required: true },
      semantic_version: { dataType: "string" },
      zip: { dataType: "string" },
      size_of_zip: { dataType: "double" },
      git_commit_id: { dataType: "string" },
      files: {
        dataType: "array",
        array: { dataType: "refObject", ref: "FileMetadata" },
        required: true,
      },
      app_metadata: { ref: "AppMetadataJSON", required: true },
      published_at: { dataType: "datetime" },
      download_count: { dataType: "double", required: true },
      project_slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Project: {
    dataType: "refObject",
    properties: {
      slug: { dataType: "string", required: true },
      idp_user_id: { dataType: "string", required: true },
      git: { dataType: "string" },
      allow_team_fixes: { dataType: "boolean" },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      name: { dataType: "string" },
      min_firmware: { dataType: "double" },
      max_firmware: { dataType: "double" },
      git_commit_id: { dataType: "string" },
      published_at: { dataType: "datetime" },
      license: { dataType: "string" },
      category: { ref: "AppCategoryName", required: true },
      description: { dataType: "string" },
      revision: { dataType: "double" },
      interpreter: { dataType: "string" },
      version: { ref: "Version" },
      badges: { dataType: "array", array: { dataType: "string" } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectSlug: {
    dataType: "refAlias",
    type: { dataType: "string", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_CreateProjectProps.Exclude_keyofCreateProjectProps.slug-or-idp_user_id__":
    {
      dataType: "refAlias",
      type: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          git: { dataType: "string" },
          allow_team_fixes: { dataType: "boolean" },
        },
        validators: {},
      },
    },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_CreateProjectProps.slug-or-idp_user_id_": {
    dataType: "refAlias",
    type: {
      ref: "Pick_CreateProjectProps.Exclude_keyofCreateProjectProps.slug-or-idp_user_id__",
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectPropsPartial: {
    dataType: "refObject",
    properties: {
      idp_user_id: { dataType: "string" },
      git: { dataType: "string" },
      allow_team_fixes: { dataType: "boolean" },
      created_at: { dataType: "string" },
      updated_at: { dataType: "string" },
      latest_revision: { dataType: "double" },
      draft_revision: { dataType: "double" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_string.string_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      additionalProperties: { dataType: "string" },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_string._source-string--destination-string_-Array_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      additionalProperties: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            destination: { dataType: "string", required: true },
            source: { dataType: "string", required: true },
          },
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DbInsertAppMetadataJSONPartial: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string" },
      description: { dataType: "string" },
      category: { ref: "AppCategoryName" },
      author: { dataType: "string" },
      icon: { dataType: "string" },
      license_file: { dataType: "string" },
      is_library: { dataType: "boolean" },
      is_hidden: { dataType: "boolean" },
      semantic_version: { dataType: "string" },
      interpreter: { dataType: "string" },
      main_executable: { dataType: "string" },
      main_executable_overrides: { ref: "Record_string.string_" },
      file_mappings: {
        dataType: "array",
        array: {
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            destination: { dataType: "string", required: true },
            source: { dataType: "string", required: true },
          },
        },
      },
      file_mappings_overrides: {
        ref: "Record_string._source-string--destination-string_-Array_",
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(
  app: Router,
  opts?: { multer?: ReturnType<typeof multer> }
) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const upload = opts?.multer || multer({ limits: { fileSize: 8388608 } });

  app.get(
    "/api/v3/private",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getPrivate
    ),

    async function PublicRestController_getPrivate(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getPrivate",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/devices",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getDevices
    ),

    async function PublicRestController_getDevices(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getDevices",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/categories",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getCategories
    ),

    async function PublicRestController_getCategories(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getCategories",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getProjects
    ),

    async function PublicRestController_getProjects(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        pageStart: { in: "query", name: "pageStart", dataType: "double" },
        pageLength: { in: "query", name: "pageLength", dataType: "double" },
        category: { in: "query", name: "category", dataType: "string" },
        device: { in: "query", name: "device", dataType: "string" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getProjects",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug/rev:revision",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getProjectVersion
    ),

    async function PublicRestController_getProjectVersion(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        revision: {
          in: "path",
          name: "revision",
          required: true,
          ref: "RevisionNumber",
        },
        notFoundResponse: {
          in: "res",
          name: "404",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getProjectVersion",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getProject
    ),

    async function PublicRestController_getProject(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        notFoundResponse: {
          in: "res",
          name: "404",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getProject",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug/latest/files/:filePath",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getLatestPublishedFile
    ),

    async function PublicRestController_getLatestPublishedFile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        filePath: {
          in: "path",
          name: "filePath",
          required: true,
          dataType: "string",
        },
        notFoundResponse: {
          in: "res",
          name: "404",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getLatestPublishedFile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug/rev:revision/files/:filePath",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(
      PublicRestController.prototype.getFileForVersion
    ),

    async function PublicRestController_getFileForVersion(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        revision: {
          in: "path",
          name: "revision",
          required: true,
          ref: "RevisionNumber",
        },
        filePath: {
          in: "path",
          name: "filePath",
          required: true,
          dataType: "string",
        },
        notFoundResponse: {
          in: "res",
          name: "404",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PublicRestController();

        await templateService.apiHandler({
          methodName: "getFileForVersion",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/users/:userId/drafts",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.getUserDraftProjects
    ),

    async function PrivateRestController_getUserDraftProjects(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: {
          in: "path",
          name: "userId",
          required: true,
          dataType: "string",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
        pageStart: { in: "query", name: "pageStart", dataType: "double" },
        pageLength: { in: "query", name: "pageLength", dataType: "double" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "getUserDraftProjects",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v3/projects/:slug",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.createProject
    ),

    async function PrivateRestController_createProject(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, ref: "ProjectSlug" },
        props: {
          in: "body",
          name: "props",
          required: true,
          ref: "Omit_CreateProjectProps.slug-or-idp_user_id_",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "createProject",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v3/projects/:slug",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.deleteProject
    ),

    async function PrivateRestController_deleteProject(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, ref: "ProjectSlug" },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "deleteProject",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v3/projects/:slug",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.updateProject
    ),

    async function PrivateRestController_updateProject(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, ref: "ProjectSlug" },
        changes: {
          in: "body",
          name: "changes",
          required: true,
          ref: "ProjectPropsPartial",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "updateProject",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v3/projects/:slug/draft/files/:filePath",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    upload.fields([
      {
        name: "file",
        maxCount: 1,
      },
    ]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.writeDraftFile
    ),

    async function PrivateRestController_writeDraftFile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        filePath: {
          in: "path",
          name: "filePath",
          required: true,
          dataType: "string",
        },
        file: {
          in: "formData",
          name: "file",
          required: true,
          dataType: "file",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "writeDraftFile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v3/projects/:slug/draft/files/:filePath",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.deleteDraftFile
    ),

    async function PrivateRestController_deleteDraftFile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        filePath: {
          in: "path",
          name: "filePath",
          required: true,
          dataType: "string",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "deleteDraftFile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v3/projects/:slug/draft/metadata",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.changeDraftAppMetadata
    ),

    async function PrivateRestController_changeDraftAppMetadata(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        appMetadataChanges: {
          in: "body",
          name: "appMetadataChanges",
          required: true,
          ref: "DbInsertAppMetadataJSONPartial",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "changeDraftAppMetadata",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug/draft/files/:filePath",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.getDraftFile
    ),

    async function PrivateRestController_getDraftFile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        filePath: {
          in: "path",
          name: "filePath",
          required: true,
          dataType: "string",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "getDraftFile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v3/projects/:slug/draft",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.getDraftProject
    ),

    async function PrivateRestController_getDraftProject(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "getDraftProject",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/api/v3/projects/:slug/publish",
    authenticateMiddleware([{ bearer: ["hacker"] }]),
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.publishVersion
    ),

    async function PrivateRestController_publishVersion(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        badRequestCallback: {
          in: "res",
          name: "403",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: { reason: { dataType: "string", required: true } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new PrivateRestController();

        await templateService.apiHandler({
          methodName: "publishVersion",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/dev/populate",
    ...fetchMiddlewares<RequestHandler>(DevRestController),
    ...fetchMiddlewares<RequestHandler>(
      DevRestController.prototype.rePopulateDB
    ),

    async function DevRestController_rePopulateDB(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new DevRestController();

        await templateService.apiHandler({
          methodName: "rePopulateDB",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(
      request: any,
      response: any,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthenticationRecasted(
                request,
                name,
                secMethod[name],
                response
              ).catch(pushAndRethrow)
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthenticationRecasted(
                request,
                name,
                secMethod[name],
                response
              ).catch(pushAndRethrow)
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request["user"] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
