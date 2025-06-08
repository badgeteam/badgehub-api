## MCP Servers

### MCP Dev Server

This mcp server is used for development and testing purposes of the badgehub project.
It is for usage with an agent with mcp tool support, for example github copilot in Agent mode.
To use it, your mcp config in your ide should look like something this:

```json
{
  "servers": {
    "myVitest": {
      "command": "npm",
      "args": ["run", "start:vitest-mcp"],
      "cwd": "/Users/fduvivier/gitProjects/PSNL/BADGETEAM/badgehub/badgehub-api/packages/mcp"
    }
  }
}
```
