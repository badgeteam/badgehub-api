import { describe, expect, it } from "vitest";

import { createSwaggerDoc } from "@createSwaggerDoc";

const swaggerDoc = createSwaggerDoc();

describe("createSwaggerDoc", () => {
  it("swagger doc should match snapshot", async () => {
    expect(swaggerDoc).toMatchInlineSnapshot(`
      {
        "components": {
          "securitySchemes": {
            "bearer": {
              "bearerFormat": "JWT",
              "scheme": "bearer",
              "type": "http",
            },
          },
        },
        "info": {
          "title": "BadgeHub API",
          "version": "1.0.0",
        },
        "openapi": "3.0.2",
        "paths": {
          "/api-docs/swagger.json": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getSwaggerDoc",
              "parameters": [],
              "responses": {
                "200": {
                  "description": "200",
                },
              },
              "summary": undefined,
              "tags": [
                "Open API",
              ],
            },
          },
          "/api/v3/badges": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getBadges",
              "parameters": [],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "description": "badge slug",
                          "type": "string",
                        },
                        "type": "array",
                      },
                    },
                  },
                  "description": "200",
                },
              },
              "summary": undefined,
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/categories": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getCategories",
              "parameters": [],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "type": "string",
                        },
                        "type": "array",
                      },
                    },
                  },
                  "description": "200",
                },
              },
              "summary": undefined,
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/projects": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getProjects",
              "parameters": [
                {
                  "in": "query",
                  "name": "pageStart",
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
                {
                  "in": "query",
                  "name": "pageLength",
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
                {
                  "description": "badge slug",
                  "in": "query",
                  "name": "badge",
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "query",
                  "name": "category",
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "query",
                  "name": "projectSlug",
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "description": "allow a text search over the apps' slug, name and descriptions",
                  "in": "query",
                  "name": "search",
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "properties": {
                            "badges": {
                              "items": {
                                "type": "string",
                              },
                              "type": "array",
                            },
                            "categories": {
                              "items": {
                                "type": "string",
                              },
                              "type": "array",
                            },
                            "description": {
                              "type": "string",
                            },
                            "git": {
                              "type": "string",
                            },
                            "icon_map": {
                              "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                              "properties": {
                                "16x16": {
                                  "type": "string",
                                },
                                "32x32": {
                                  "type": "string",
                                },
                                "64x64": {
                                  "type": "string",
                                },
                                "8x8": {
                                  "type": "string",
                                },
                              },
                              "type": "object",
                            },
                            "idp_user_id": {
                              "type": "string",
                            },
                            "license_type": {
                              "type": "string",
                            },
                            "name": {
                              "type": "string",
                            },
                            "published_at": {
                              "format": "date-time",
                              "type": "string",
                            },
                            "revision": {
                              "type": "number",
                            },
                            "slug": {
                              "type": "string",
                            },
                          },
                          "required": [
                            "slug",
                            "idp_user_id",
                            "name",
                            "revision",
                          ],
                          "type": "object",
                        },
                        "type": "array",
                      },
                    },
                  },
                  "description": "200",
                },
              },
              "summary": "Get all Projects",
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/projects/{slug}": {
            "delete": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "deleteProject",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Delete an existing project",
              "tags": [
                "Private",
              ],
            },
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getProject",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "created_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "git": {
                            "type": "string",
                          },
                          "idp_user_id": {
                            "type": "string",
                          },
                          "slug": {
                            "type": "string",
                          },
                          "updated_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "version": {
                            "properties": {
                              "app_metadata": {
                                "properties": {
                                  "application": {
                                    "description": "A list of application variants that allows specifying badge-specific properties of the project",
                                    "items": {
                                      "properties": {
                                        "assets": {
                                          "description": "List of assets that are part of the variant, with optionally an indication of how the files should be mapped on the badge. 
      if the assets property is not present, then all project files should be considered part of the variant.",
                                          "items": {
                                            "properties": {
                                              "destination_file": {
                                                "description": "Path to the destination file in the badge's filesystem",
                                                "type": "string",
                                              },
                                              "source_file": {
                                                "description": "Path to the source file, relative to the project root",
                                                "type": "string",
                                              },
                                            },
                                            "required": [
                                              "source_file",
                                            ],
                                            "type": "object",
                                          },
                                          "type": "array",
                                        },
                                        "badges": {
                                          "description": "list of badges that that this variant is made for. This should be subset of the badges in the top level appmetadata.json and it should not overlap with any other variants.",
                                          "items": {
                                            "description": "badge slug",
                                            "type": "string",
                                          },
                                          "type": "array",
                                        },
                                        "executable": {
                                          "description": "Path to the source_file path of the file that should be executed to launch an app.
      If the executable property is not present, then it can be guessed by the badge firmware (eg. case of only one file with correct extension, or case of __init__.py file in micropython app.",
                                          "type": "string",
                                        },
                                        "revision": {
                                          "description": "Revision of the project for this variant. If it is not present, then the revision of the project should be used.
      Warning: if it is present, then badgehub clients on badges will not update the app unless the this revision number is increased.",
                                          "exclusiveMinimum": 0,
                                          "minimum": 0,
                                          "type": "integer",
                                        },
                                        "type": {
                                          "description": "the type of the application variant, eg 'standalone', 'badge_vms', 'appfs', 'micropython', 'circuitpython', ...",
                                          "type": "string",
                                        },
                                      },
                                      "type": "object",
                                    },
                                    "type": "array",
                                  },
                                  "author": {
                                    "description": "Name of the author of the project",
                                    "type": "string",
                                  },
                                  "badges": {
                                    "description": "list of badges that are compatible with this project.",
                                    "items": {
                                      "description": "badge slug",
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "categories": {
                                    "description": "Categories that the app falls into, eg. 'Event Related'. Categories are defined by the specific badgehub instance's config.",
                                    "items": {
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "description": {
                                    "description": "Some more details about the app. Allows users to decide whether they want to install the app.",
                                    "type": "string",
                                  },
                                  "icon_map": {
                                    "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                                    "properties": {
                                      "16x16": {
                                        "type": "string",
                                      },
                                      "32x32": {
                                        "type": "string",
                                      },
                                      "64x64": {
                                        "type": "string",
                                      },
                                      "8x8": {
                                        "type": "string",
                                      },
                                    },
                                    "type": "object",
                                  },
                                  "license_file": {
                                    "description": "Path to the License file. Default is LICENSE",
                                    "type": "string",
                                  },
                                  "license_type": {
                                    "description": "Short description of the license type, eg. 'MIT'",
                                    "type": "string",
                                  },
                                  "name": {
                                    "description": "name, we need this to show in the launcher and on badgehub.",
                                    "type": "string",
                                  },
                                  "project_type": {
                                    "description": "Type of the project, eg. 'app' or 'library'",
                                    "enum": [
                                      "app",
                                      "library",
                                      "firmware",
                                      "other",
                                    ],
                                    "type": "string",
                                  },
                                  "version": {
                                    "description": "Semantic version of the project",
                                    "type": "string",
                                  },
                                },
                                "type": "object",
                              },
                              "download_count": {
                                "type": "number",
                              },
                              "files": {
                                "items": {
                                  "properties": {
                                    "created_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "dir": {
                                      "type": "string",
                                    },
                                    "ext": {
                                      "type": "string",
                                    },
                                    "full_path": {
                                      "type": "string",
                                    },
                                    "mimetype": {
                                      "type": "string",
                                    },
                                    "name": {
                                      "type": "string",
                                    },
                                    "sha256": {
                                      "pattern": "^[a-f0-9]{64}$",
                                      "type": "string",
                                    },
                                    "size_formatted": {
                                      "type": "string",
                                    },
                                    "size_of_content": {
                                      "type": "number",
                                    },
                                    "updated_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "url": {
                                      "description": "Url that should be used to download the file",
                                      "format": "uri",
                                      "type": "string",
                                    },
                                  },
                                  "required": [
                                    "created_at",
                                    "updated_at",
                                    "dir",
                                    "name",
                                    "ext",
                                    "mimetype",
                                    "size_of_content",
                                    "sha256",
                                    "size_formatted",
                                    "full_path",
                                    "url",
                                  ],
                                  "type": "object",
                                },
                                "type": "array",
                              },
                              "git_commit_id": {
                                "type": "string",
                              },
                              "project_slug": {
                                "type": "string",
                              },
                              "published_at": {
                                "format": "date-time",
                                "type": "string",
                              },
                              "revision": {
                                "type": "number",
                              },
                              "size_of_zip": {
                                "type": "number",
                              },
                              "zip": {
                                "type": "string",
                              },
                            },
                            "required": [
                              "revision",
                              "files",
                              "app_metadata",
                              "download_count",
                            ],
                            "type": "object",
                          },
                        },
                        "required": [
                          "slug",
                          "idp_user_id",
                          "version",
                          "created_at",
                          "updated_at",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "200",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "summary": "Get (Latest) Project Details by Slug",
              "tags": [
                "Public",
              ],
            },
            "patch": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "updateProject",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "description": "Schema request body for creating or updating a project",
                      "properties": {
                        "git": {
                          "type": "string",
                        },
                      },
                      "type": "object",
                    },
                  },
                },
                "description": "Body",
              },
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Update an existing project",
              "tags": [
                "Private",
              ],
            },
            "post": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "createProject",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "description": "Schema request body for creating or updating a project",
                      "properties": {
                        "git": {
                          "type": "string",
                        },
                      },
                      "type": "object",
                    },
                  },
                },
                "description": "Body",
              },
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "409": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "409",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Create a new project",
              "tags": [
                "Private",
              ],
            },
          },
          "/api/v3/projects/{slug}/draft": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getDraftProject",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "created_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "git": {
                            "type": "string",
                          },
                          "idp_user_id": {
                            "type": "string",
                          },
                          "slug": {
                            "type": "string",
                          },
                          "updated_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "version": {
                            "properties": {
                              "app_metadata": {
                                "properties": {
                                  "application": {
                                    "description": "A list of application variants that allows specifying badge-specific properties of the project",
                                    "items": {
                                      "properties": {
                                        "assets": {
                                          "description": "List of assets that are part of the variant, with optionally an indication of how the files should be mapped on the badge. 
      if the assets property is not present, then all project files should be considered part of the variant.",
                                          "items": {
                                            "properties": {
                                              "destination_file": {
                                                "description": "Path to the destination file in the badge's filesystem",
                                                "type": "string",
                                              },
                                              "source_file": {
                                                "description": "Path to the source file, relative to the project root",
                                                "type": "string",
                                              },
                                            },
                                            "required": [
                                              "source_file",
                                            ],
                                            "type": "object",
                                          },
                                          "type": "array",
                                        },
                                        "badges": {
                                          "description": "list of badges that that this variant is made for. This should be subset of the badges in the top level appmetadata.json and it should not overlap with any other variants.",
                                          "items": {
                                            "description": "badge slug",
                                            "type": "string",
                                          },
                                          "type": "array",
                                        },
                                        "executable": {
                                          "description": "Path to the source_file path of the file that should be executed to launch an app.
      If the executable property is not present, then it can be guessed by the badge firmware (eg. case of only one file with correct extension, or case of __init__.py file in micropython app.",
                                          "type": "string",
                                        },
                                        "revision": {
                                          "description": "Revision of the project for this variant. If it is not present, then the revision of the project should be used.
      Warning: if it is present, then badgehub clients on badges will not update the app unless the this revision number is increased.",
                                          "exclusiveMinimum": 0,
                                          "minimum": 0,
                                          "type": "integer",
                                        },
                                        "type": {
                                          "description": "the type of the application variant, eg 'standalone', 'badge_vms', 'appfs', 'micropython', 'circuitpython', ...",
                                          "type": "string",
                                        },
                                      },
                                      "type": "object",
                                    },
                                    "type": "array",
                                  },
                                  "author": {
                                    "description": "Name of the author of the project",
                                    "type": "string",
                                  },
                                  "badges": {
                                    "description": "list of badges that are compatible with this project.",
                                    "items": {
                                      "description": "badge slug",
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "categories": {
                                    "description": "Categories that the app falls into, eg. 'Event Related'. Categories are defined by the specific badgehub instance's config.",
                                    "items": {
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "description": {
                                    "description": "Some more details about the app. Allows users to decide whether they want to install the app.",
                                    "type": "string",
                                  },
                                  "icon_map": {
                                    "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                                    "properties": {
                                      "16x16": {
                                        "type": "string",
                                      },
                                      "32x32": {
                                        "type": "string",
                                      },
                                      "64x64": {
                                        "type": "string",
                                      },
                                      "8x8": {
                                        "type": "string",
                                      },
                                    },
                                    "type": "object",
                                  },
                                  "license_file": {
                                    "description": "Path to the License file. Default is LICENSE",
                                    "type": "string",
                                  },
                                  "license_type": {
                                    "description": "Short description of the license type, eg. 'MIT'",
                                    "type": "string",
                                  },
                                  "name": {
                                    "description": "name, we need this to show in the launcher and on badgehub.",
                                    "type": "string",
                                  },
                                  "project_type": {
                                    "description": "Type of the project, eg. 'app' or 'library'",
                                    "enum": [
                                      "app",
                                      "library",
                                      "firmware",
                                      "other",
                                    ],
                                    "type": "string",
                                  },
                                  "version": {
                                    "description": "Semantic version of the project",
                                    "type": "string",
                                  },
                                },
                                "type": "object",
                              },
                              "download_count": {
                                "type": "number",
                              },
                              "files": {
                                "items": {
                                  "properties": {
                                    "created_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "dir": {
                                      "type": "string",
                                    },
                                    "ext": {
                                      "type": "string",
                                    },
                                    "full_path": {
                                      "type": "string",
                                    },
                                    "mimetype": {
                                      "type": "string",
                                    },
                                    "name": {
                                      "type": "string",
                                    },
                                    "sha256": {
                                      "pattern": "^[a-f0-9]{64}$",
                                      "type": "string",
                                    },
                                    "size_formatted": {
                                      "type": "string",
                                    },
                                    "size_of_content": {
                                      "type": "number",
                                    },
                                    "updated_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "url": {
                                      "description": "Url that should be used to download the file",
                                      "format": "uri",
                                      "type": "string",
                                    },
                                  },
                                  "required": [
                                    "created_at",
                                    "updated_at",
                                    "dir",
                                    "name",
                                    "ext",
                                    "mimetype",
                                    "size_of_content",
                                    "sha256",
                                    "size_formatted",
                                    "full_path",
                                    "url",
                                  ],
                                  "type": "object",
                                },
                                "type": "array",
                              },
                              "git_commit_id": {
                                "type": "string",
                              },
                              "project_slug": {
                                "type": "string",
                              },
                              "published_at": {
                                "format": "date-time",
                                "type": "string",
                              },
                              "revision": {
                                "type": "number",
                              },
                              "size_of_zip": {
                                "type": "number",
                              },
                              "zip": {
                                "type": "string",
                              },
                            },
                            "required": [
                              "revision",
                              "files",
                              "app_metadata",
                              "download_count",
                            ],
                            "type": "object",
                          },
                        },
                        "required": [
                          "slug",
                          "idp_user_id",
                          "version",
                          "created_at",
                          "updated_at",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "200",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Get project details for the draft version of a project",
              "tags": [
                "Private",
              ],
            },
          },
          "/api/v3/projects/{slug}/draft/files/{filePath}": {
            "delete": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "deleteDraftFile",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "filePath",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Delete a file from the latest draft version of a project",
              "tags": [
                "Private",
              ],
            },
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getDraftFile",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "filePath",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "description": "File content as a stream",
                        "nullable": true,
                      },
                    },
                  },
                  "description": "File content as a stream",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Get a file from the draft version of a project",
              "tags": [
                "Private",
              ],
            },
            "post": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "writeDraftFile",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "filePath",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "multipart/form-data": {
                    "schema": {
                      "nullable": true,
                    },
                  },
                },
                "description": "Body",
              },
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Upload a file to the latest draft version of a project",
              "tags": [
                "Private",
              ],
            },
          },
          "/api/v3/projects/{slug}/draft/metadata": {
            "patch": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "changeDraftAppMetadata",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "properties": {
                        "application": {
                          "description": "A list of application variants that allows specifying badge-specific properties of the project",
                          "items": {
                            "properties": {
                              "assets": {
                                "description": "List of assets that are part of the variant, with optionally an indication of how the files should be mapped on the badge. 
      if the assets property is not present, then all project files should be considered part of the variant.",
                                "items": {
                                  "properties": {
                                    "destination_file": {
                                      "description": "Path to the destination file in the badge's filesystem",
                                      "type": "string",
                                    },
                                    "source_file": {
                                      "description": "Path to the source file, relative to the project root",
                                      "type": "string",
                                    },
                                  },
                                  "required": [
                                    "source_file",
                                  ],
                                  "type": "object",
                                },
                                "type": "array",
                              },
                              "badges": {
                                "description": "list of badges that that this variant is made for. This should be subset of the badges in the top level appmetadata.json and it should not overlap with any other variants.",
                                "items": {
                                  "description": "badge slug",
                                  "type": "string",
                                },
                                "type": "array",
                              },
                              "executable": {
                                "description": "Path to the source_file path of the file that should be executed to launch an app.
      If the executable property is not present, then it can be guessed by the badge firmware (eg. case of only one file with correct extension, or case of __init__.py file in micropython app.",
                                "type": "string",
                              },
                              "revision": {
                                "description": "Revision of the project for this variant. If it is not present, then the revision of the project should be used.
      Warning: if it is present, then badgehub clients on badges will not update the app unless the this revision number is increased.",
                                "exclusiveMinimum": 0,
                                "minimum": 0,
                                "type": "integer",
                              },
                              "type": {
                                "description": "the type of the application variant, eg 'standalone', 'badge_vms', 'appfs', 'micropython', 'circuitpython', ...",
                                "type": "string",
                              },
                            },
                            "type": "object",
                          },
                          "type": "array",
                        },
                        "author": {
                          "description": "Name of the author of the project",
                          "type": "string",
                        },
                        "badges": {
                          "description": "list of badges that are compatible with this project.",
                          "items": {
                            "description": "badge slug",
                            "type": "string",
                          },
                          "type": "array",
                        },
                        "categories": {
                          "description": "Categories that the app falls into, eg. 'Event Related'. Categories are defined by the specific badgehub instance's config.",
                          "items": {
                            "type": "string",
                          },
                          "type": "array",
                        },
                        "description": {
                          "description": "Some more details about the app. Allows users to decide whether they want to install the app.",
                          "type": "string",
                        },
                        "icon_map": {
                          "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                          "properties": {
                            "16x16": {
                              "type": "string",
                            },
                            "32x32": {
                              "type": "string",
                            },
                            "64x64": {
                              "type": "string",
                            },
                            "8x8": {
                              "type": "string",
                            },
                          },
                          "type": "object",
                        },
                        "license_file": {
                          "description": "Path to the License file. Default is LICENSE",
                          "type": "string",
                        },
                        "license_type": {
                          "description": "Short description of the license type, eg. 'MIT'",
                          "type": "string",
                        },
                        "name": {
                          "description": "name, we need this to show in the launcher and on badgehub.",
                          "type": "string",
                        },
                        "project_type": {
                          "description": "Type of the project, eg. 'app' or 'library'",
                          "enum": [
                            "app",
                            "library",
                            "firmware",
                            "other",
                          ],
                          "type": "string",
                        },
                        "version": {
                          "description": "Semantic version of the project",
                          "type": "string",
                        },
                      },
                      "type": "object",
                    },
                  },
                },
                "description": "Body",
              },
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Overwrite the metadata of the latest draft version of a project. 
      This is actually just an alias for a post to /projects/:slug/draft/files/metadata.json",
              "tags": [
                "Private",
              ],
            },
          },
          "/api/v3/projects/{slug}/latest/files/{filePath}": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getLatestPublishedFile",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "filePath",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "description": "ReadableStream",
                        "nullable": true,
                      },
                    },
                  },
                  "description": "ReadableStream",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "summary": "Get the latest published revision of a file in the project",
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/projects/{slug}/publish": {
            "patch": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "publishVersion",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "nullable": true,
                    },
                  },
                },
                "description": "Body",
              },
              "responses": {
                "204": {
                  "content": {
                    "application/json": {
                      "schema": {},
                    },
                  },
                  "description": "204",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Publish the current draft as a new version",
              "tags": [
                "Private",
              ],
            },
          },
          "/api/v3/projects/{slug}/rev{revision}": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getProjectForRevision",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "revision",
                  "required": true,
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "created_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "git": {
                            "type": "string",
                          },
                          "idp_user_id": {
                            "type": "string",
                          },
                          "slug": {
                            "type": "string",
                          },
                          "updated_at": {
                            "format": "date-time",
                            "type": "string",
                          },
                          "version": {
                            "properties": {
                              "app_metadata": {
                                "properties": {
                                  "application": {
                                    "description": "A list of application variants that allows specifying badge-specific properties of the project",
                                    "items": {
                                      "properties": {
                                        "assets": {
                                          "description": "List of assets that are part of the variant, with optionally an indication of how the files should be mapped on the badge. 
      if the assets property is not present, then all project files should be considered part of the variant.",
                                          "items": {
                                            "properties": {
                                              "destination_file": {
                                                "description": "Path to the destination file in the badge's filesystem",
                                                "type": "string",
                                              },
                                              "source_file": {
                                                "description": "Path to the source file, relative to the project root",
                                                "type": "string",
                                              },
                                            },
                                            "required": [
                                              "source_file",
                                            ],
                                            "type": "object",
                                          },
                                          "type": "array",
                                        },
                                        "badges": {
                                          "description": "list of badges that that this variant is made for. This should be subset of the badges in the top level appmetadata.json and it should not overlap with any other variants.",
                                          "items": {
                                            "description": "badge slug",
                                            "type": "string",
                                          },
                                          "type": "array",
                                        },
                                        "executable": {
                                          "description": "Path to the source_file path of the file that should be executed to launch an app.
      If the executable property is not present, then it can be guessed by the badge firmware (eg. case of only one file with correct extension, or case of __init__.py file in micropython app.",
                                          "type": "string",
                                        },
                                        "revision": {
                                          "description": "Revision of the project for this variant. If it is not present, then the revision of the project should be used.
      Warning: if it is present, then badgehub clients on badges will not update the app unless the this revision number is increased.",
                                          "exclusiveMinimum": 0,
                                          "minimum": 0,
                                          "type": "integer",
                                        },
                                        "type": {
                                          "description": "the type of the application variant, eg 'standalone', 'badge_vms', 'appfs', 'micropython', 'circuitpython', ...",
                                          "type": "string",
                                        },
                                      },
                                      "type": "object",
                                    },
                                    "type": "array",
                                  },
                                  "author": {
                                    "description": "Name of the author of the project",
                                    "type": "string",
                                  },
                                  "badges": {
                                    "description": "list of badges that are compatible with this project.",
                                    "items": {
                                      "description": "badge slug",
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "categories": {
                                    "description": "Categories that the app falls into, eg. 'Event Related'. Categories are defined by the specific badgehub instance's config.",
                                    "items": {
                                      "type": "string",
                                    },
                                    "type": "array",
                                  },
                                  "description": {
                                    "description": "Some more details about the app. Allows users to decide whether they want to install the app.",
                                    "type": "string",
                                  },
                                  "icon_map": {
                                    "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                                    "properties": {
                                      "16x16": {
                                        "type": "string",
                                      },
                                      "32x32": {
                                        "type": "string",
                                      },
                                      "64x64": {
                                        "type": "string",
                                      },
                                      "8x8": {
                                        "type": "string",
                                      },
                                    },
                                    "type": "object",
                                  },
                                  "license_file": {
                                    "description": "Path to the License file. Default is LICENSE",
                                    "type": "string",
                                  },
                                  "license_type": {
                                    "description": "Short description of the license type, eg. 'MIT'",
                                    "type": "string",
                                  },
                                  "name": {
                                    "description": "name, we need this to show in the launcher and on badgehub.",
                                    "type": "string",
                                  },
                                  "project_type": {
                                    "description": "Type of the project, eg. 'app' or 'library'",
                                    "enum": [
                                      "app",
                                      "library",
                                      "firmware",
                                      "other",
                                    ],
                                    "type": "string",
                                  },
                                  "version": {
                                    "description": "Semantic version of the project",
                                    "type": "string",
                                  },
                                },
                                "type": "object",
                              },
                              "download_count": {
                                "type": "number",
                              },
                              "files": {
                                "items": {
                                  "properties": {
                                    "created_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "dir": {
                                      "type": "string",
                                    },
                                    "ext": {
                                      "type": "string",
                                    },
                                    "full_path": {
                                      "type": "string",
                                    },
                                    "mimetype": {
                                      "type": "string",
                                    },
                                    "name": {
                                      "type": "string",
                                    },
                                    "sha256": {
                                      "pattern": "^[a-f0-9]{64}$",
                                      "type": "string",
                                    },
                                    "size_formatted": {
                                      "type": "string",
                                    },
                                    "size_of_content": {
                                      "type": "number",
                                    },
                                    "updated_at": {
                                      "format": "date-time",
                                      "type": "string",
                                    },
                                    "url": {
                                      "description": "Url that should be used to download the file",
                                      "format": "uri",
                                      "type": "string",
                                    },
                                  },
                                  "required": [
                                    "created_at",
                                    "updated_at",
                                    "dir",
                                    "name",
                                    "ext",
                                    "mimetype",
                                    "size_of_content",
                                    "sha256",
                                    "size_formatted",
                                    "full_path",
                                    "url",
                                  ],
                                  "type": "object",
                                },
                                "type": "array",
                              },
                              "git_commit_id": {
                                "type": "string",
                              },
                              "project_slug": {
                                "type": "string",
                              },
                              "published_at": {
                                "format": "date-time",
                                "type": "string",
                              },
                              "revision": {
                                "type": "number",
                              },
                              "size_of_zip": {
                                "type": "number",
                              },
                              "zip": {
                                "type": "string",
                              },
                            },
                            "required": [
                              "revision",
                              "files",
                              "app_metadata",
                              "download_count",
                            ],
                            "type": "object",
                          },
                        },
                        "required": [
                          "slug",
                          "idp_user_id",
                          "version",
                          "created_at",
                          "updated_at",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "200",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "summary": "Get project details for a specific published revision of the project",
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/projects/{slug}/rev{revision}/files/{filePath}": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getFileForRevision",
              "parameters": [
                {
                  "in": "path",
                  "name": "slug",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "path",
                  "name": "revision",
                  "required": true,
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
                {
                  "in": "path",
                  "name": "filePath",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "description": "ReadableStream",
                        "nullable": true,
                      },
                    },
                  },
                  "description": "ReadableStream",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "404",
                },
              },
              "summary": "Get a file for a specific revision of the project",
              "tags": [
                "Public",
              ],
            },
          },
          "/api/v3/users/{userId}/drafts": {
            "get": {
              "deprecated": undefined,
              "description": undefined,
              "operationId": "getUserDraftProjects",
              "parameters": [
                {
                  "in": "path",
                  "name": "userId",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
                {
                  "in": "query",
                  "name": "pageStart",
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
                {
                  "in": "query",
                  "name": "pageLength",
                  "schema": {
                    "nullable": true,
                    "type": "number",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "properties": {
                            "badges": {
                              "items": {
                                "type": "string",
                              },
                              "type": "array",
                            },
                            "categories": {
                              "items": {
                                "type": "string",
                              },
                              "type": "array",
                            },
                            "description": {
                              "type": "string",
                            },
                            "git": {
                              "type": "string",
                            },
                            "icon_map": {
                              "description": "Icon Map of the project that maps from accepted sizes to a file path. Icon format is quite strict because BadgeHub is the first user of these icons.
          Badge implementations can use these icons but they are not required to. For example if a badge's launcher an icon as an icon.py file, this file can still just be uploaded and the path could be indicated as custom property in the variant json.".",
                              "properties": {
                                "16x16": {
                                  "type": "string",
                                },
                                "32x32": {
                                  "type": "string",
                                },
                                "64x64": {
                                  "type": "string",
                                },
                                "8x8": {
                                  "type": "string",
                                },
                              },
                              "type": "object",
                            },
                            "idp_user_id": {
                              "type": "string",
                            },
                            "license_type": {
                              "type": "string",
                            },
                            "name": {
                              "type": "string",
                            },
                            "published_at": {
                              "format": "date-time",
                              "type": "string",
                            },
                            "revision": {
                              "type": "number",
                            },
                            "slug": {
                              "type": "string",
                            },
                          },
                          "required": [
                            "slug",
                            "idp_user_id",
                            "name",
                            "revision",
                          ],
                          "type": "object",
                        },
                        "type": "array",
                      },
                    },
                  },
                  "description": "200",
                },
                "403": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "reason": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "reason",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "403",
                },
              },
              "security": [
                {
                  "bearer": [
                    "private",
                  ],
                },
              ],
              "summary": "Get all draft projects for a user",
              "tags": [
                "Private",
              ],
            },
          },
        },
        "servers": [
          {
            "url": "/",
          },
          {
            "url": "https://badgehub-api.p1m.nl/",
          },
          {
            "url": "https://localhost:8081/",
          },
        ],
        "tags": [
          {
            "description": "Operations allowing to download the open api spec.",
            "name": "Open API",
          },
          {
            "description": "Operations available without any authentication.",
            "name": "Public",
          },
          {
            "description": "Operations available to authenticated users.",
            "name": "Private",
          },
        ],
      }
    `);
  });
});
