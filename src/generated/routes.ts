/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  TsoaRoute,
  fetchMiddlewares,
  ExpressTemplateService,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PublicRestController } from "./../controllers/public-rest.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PrivateRestController } from "./../controllers/private-rest.js";
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Device: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Category: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  App: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      slug: { dataType: "string", required: true },
      category_slug: { dataType: "string", required: true },
      user_name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DBAppCategory: {
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
        { dataType: "enum", enums: ["Intepreter"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AppCategory: {
    dataType: "refAlias",
    type: { ref: "DBAppCategory", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DBProjectStatusName: {
    dataType: "refAlias",
    type: {
      dataType: "union",
      subSchemas: [
        { dataType: "enum", enums: ["working"] },
        { dataType: "enum", enums: ["in_progress"] },
        { dataType: "enum", enums: ["broken"] },
        { dataType: "enum", enums: ["unknown"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectStatusName: {
    dataType: "refAlias",
    type: { ref: "DBProjectStatusName", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Badge: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      id: { dataType: "double", required: true },
      name: { dataType: "string", required: true },
      slug: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectSlug: {
    dataType: "refAlias",
    type: { dataType: "string", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Dependency: {
    dataType: "refObject",
    properties: {
      project_slug: { ref: "ProjectSlug", required: true },
      semantic_version_range: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProjectStatusOnBadge: {
    dataType: "refObject",
    properties: {
      badge: { ref: "Badge", required: true },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      id: { dataType: "double", required: true },
      status: { ref: "ProjectStatusName", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Version: {
    dataType: "refObject",
    properties: {
      user: { ref: "User", required: true },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      id: { dataType: "double", required: true },
      revision: { dataType: "double", required: true },
      semantic_version: { dataType: "string" },
      zip: { dataType: "string" },
      size_of_zip: { dataType: "double" },
      git_commit_id: { dataType: "string" },
      files: {
        dataType: "array",
        array: { dataType: "refObject", ref: "FileMetadata" },
        required: true,
      },
      app_metadata: { ref: "MetadataFileContents", required: true },
      published: { dataType: "boolean", required: true },
      download_count: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      id: { dataType: "double", required: true },
      admin: { dataType: "boolean", required: true },
      name: { dataType: "string", required: true },
      email: { dataType: "string", required: true },
      password: { dataType: "string", required: true },
      remember_token: { dataType: "string" },
      editor: { dataType: "string", required: true },
      public: { dataType: "boolean", required: true },
      show_projects: { dataType: "boolean", required: true },
      google2fa_enabled: { dataType: "boolean", required: true },
      google2fa_secret: { dataType: "string" },
      email_verified_at: { dataType: "datetime" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FileMetadata: {
    dataType: "refObject",
    properties: {
      version: { ref: "Version", required: true },
      user: { ref: "User", required: true },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      id: { dataType: "double", required: true },
      editable: { dataType: "boolean" },
      lintable: { dataType: "boolean" },
      extension: { dataType: "string", required: true },
      baseName: { dataType: "string", required: true },
      mime: { dataType: "string" },
      size_of_content: { dataType: "double", required: true },
      crc32: { dataType: "string", required: true },
      size_formatted: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
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
        { dataType: "enum", enums: ["Intepreter"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_BadgeSlug.string_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      additionalProperties: { dataType: "string" },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Record_BadgeSlug.Array__source-string--destination-string___": {
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
  MetadataFileContents: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      description: { dataType: "string" },
      category: { ref: "AppCategoryName", required: true },
      author: { dataType: "string" },
      icon: { dataType: "string" },
      license_file: { dataType: "string" },
      is_library: { dataType: "boolean" },
      is_hidden: { dataType: "boolean" },
      semantic_version: { dataType: "string" },
      interpreter: { dataType: "string" },
      main_executable: { dataType: "string" },
      main_executable_overrides: { ref: "Record_BadgeSlug.string_" },
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
        ref: "Record_BadgeSlug.Array__source-string--destination-string___",
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Vote: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      type: {
        dataType: "union",
        subSchemas: [
          { dataType: "enum", enums: ["up"] },
          { dataType: "enum", enums: ["down"] },
          { dataType: "enum", enums: ["pig"] },
        ],
        required: true,
      },
      comment: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  VoteFromUser: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      type: {
        dataType: "union",
        subSchemas: [
          { dataType: "enum", enums: ["up"] },
          { dataType: "enum", enums: ["down"] },
          { dataType: "enum", enums: ["pig"] },
        ],
        required: true,
      },
      comment: { dataType: "string" },
      user: { ref: "User", required: true },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Warning: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      description: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  WarningFromUser: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      description: { dataType: "string", required: true },
      user: { ref: "User", required: true },
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Project: {
    dataType: "refObject",
    properties: {
      created_at: { dataType: "datetime", required: true },
      updated_at: { dataType: "datetime", required: true },
      deleted_at: { dataType: "datetime" },
      version: { ref: "Version", required: true },
      user: { ref: "User", required: true },
      slug: { dataType: "string", required: true },
      git: { dataType: "string" },
      allow_team_fixes: { dataType: "boolean", required: true },
      name: { dataType: "string", required: true },
      min_firmware: { dataType: "double" },
      max_firmware: { dataType: "double" },
      git_commit_id: { dataType: "string" },
      published_at: { dataType: "datetime" },
      download_counter: { dataType: "double", required: true },
      license: { dataType: "string", required: true },
      size_of_zip: { dataType: "double" },
      size_of_content: { dataType: "double" },
      category: { ref: "AppCategory", required: true },
      description: { dataType: "string" },
      revision: { dataType: "string", required: true },
      status: { ref: "ProjectStatusName", required: true },
      author: { dataType: "string", required: true },
      interpreter: { dataType: "string", required: true },
      badges: {
        dataType: "array",
        array: { dataType: "refObject", ref: "Badge" },
        required: true,
      },
      dependencies: {
        dataType: "array",
        array: { dataType: "refObject", ref: "Dependency" },
        required: true,
      },
      states: {
        dataType: "array",
        array: { dataType: "refObject", ref: "ProjectStatusOnBadge" },
        required: true,
      },
      versions: {
        dataType: "array",
        array: { dataType: "refObject", ref: "Version" },
        required: true,
      },
      votes: {
        dataType: "array",
        array: { dataType: "refObject", ref: "VoteFromUser" },
        required: true,
      },
      warnings: {
        dataType: "array",
        array: { dataType: "refObject", ref: "WarningFromUser" },
        required: true,
      },
      collaborators: {
        dataType: "array",
        array: { dataType: "refObject", ref: "User" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Uint8Array: {
    dataType: "refObject",
    properties: {},
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
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
    "/api/v3/apps",
    ...fetchMiddlewares<RequestHandler>(PublicRestController),
    ...fetchMiddlewares<RequestHandler>(PublicRestController.prototype.getApps),

    async function PublicRestController_getApps(
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
          methodName: "getApps",
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
    "/api/v3/apps/:slug",
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
  app.post(
    "/api/v3/apps/:slug",
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
        slug: { in: "path", name: "slug", required: true, dataType: "string" },
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
  app.put(
    "/api/v3/apps/:slug/file/:filePath",
    ...fetchMiddlewares<RequestHandler>(PrivateRestController),
    ...fetchMiddlewares<RequestHandler>(
      PrivateRestController.prototype.writeFile
    ),

    async function PrivateRestController_writeFile(
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
        fileContent: {
          in: "body",
          name: "fileContent",
          required: true,
          dataType: "union",
          subSchemas: [{ dataType: "string" }, { ref: "Uint8Array" }],
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
          methodName: "writeFile",
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
    "/api/v3/apps/:slug/version",
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

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
