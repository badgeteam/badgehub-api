import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { runVitest, runVitestBackend, runVitestFrontend } from "./runVitest.ts";

// Create an MCP server
const server = new McpServer({
  name: "vitest-mcp-server",
  version: "v0.1.0",
});

// Define tool annotations
const frontendTestsAnnotations: ToolAnnotations = {
  title: "Run Frontend Tests",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const backendTestsAnnotations: ToolAnnotations = {
  title: "Run Frontend Tests",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const healthCheckAnnotations: ToolAnnotations = {
  title: "Health Check",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

server.tool(
  "run_backend_tests",
  "Run Backend unit tests and return results in JSON format",
  {
    testPattern: z
      .string()
      .optional()
      .describe("Optional pattern to filter tests to run"),
    update: z.boolean().optional().describe("Update snapshots (-u flag)"),
  },
  backendTestsAnnotations,
  async ({ testPattern, update }) => {
    try {
      const result = await runVitestBackend(testPattern || "", {
        update: update === true,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error: any) {
      throw new Error(`Failed to run tests: ${error.message}`);
    }
  }
);

server.tool(
  "run_frontend_tests",
  "Run Frontend unit tests and return results in JSON format",
  {
    testPattern: z
      .string()
      .optional()
      .describe("Optional pattern to filter tests to run"),
    update: z.boolean().optional().describe("Update snapshots (-u flag)"),
  },
  frontendTestsAnnotations,
  async ({ testPattern, update }) => {
    try {
      const result = await runVitestFrontend(testPattern || "", {
        update: update === true,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error: any) {
      throw new Error(`Failed to run tests: ${error.message}`);
    }
  }
);

// Add health_check tool
server.tool(
  "health_check",
  "Check if the MCP server is working properly",
  {},
  healthCheckAnnotations,
  async () => ({
    content: [{ type: "text", text: "OK" }],
  })
);

// Print startup message
console.log("Vitest MCP Server running on stdio");

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

// Handle process signals
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
