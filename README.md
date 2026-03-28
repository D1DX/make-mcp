# Make.com MCP Server — Full CRUD + Module Intelligence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **D1DX fork** of [danishashko/make-mcp](https://github.com/danishashko/make-mcp). Adds full scenario CRUD, run, activate/deactivate. Original module search, validation, and auto-healing preserved.

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for **complete Make.com scenario management** from AI assistants (Claude, Copilot, Cursor). 16 tools covering module discovery, blueprint validation, scenario CRUD, execution, and deployment with auto-healing.

## What's Different from the Original

| Capability | Original | This Fork |
|-----------|----------|-----------|
| Search modules | Yes | Yes |
| Validate blueprints | Yes | Yes |
| Create scenarios | Yes | Yes (with auto-healing) |
| List scenarios | No | **Yes** |
| Get scenario details | No | **Yes** |
| Get scenario blueprint | No | **Yes** |
| Update scenarios | No | **Yes** |
| Delete scenarios | No | **Yes** |
| Activate/deactivate | No | **Yes** |
| Run scenarios | No | **Yes** |

## Quick Start

```json
{
  "mcpServers": {
    "make": {
      "command": "npx",
      "args": ["-y", "github:D1DX/make-mcp"],
      "env": {
        "MAKE_API_KEY": "your_api_key",
        "MAKE_API_URL": "https://eu1.make.com/api/v2",
        "MAKE_TEAM_ID": "your_team_id"
      }
    }
  }
}
```

Without `MAKE_API_KEY`, all module search/validation tools still work. Only CRUD and run tools require it.

## All 16 Tools

### Module Intelligence

| Tool | Description |
|------|-------------|
| `tools_documentation` | **START HERE** — docs for all tools, prompts, resources |
| `search_modules` | Full-text search across 200+ Make.com modules |
| `get_module` | Detailed module info with parameters and docs |
| `list_apps` | List all apps with module counts |
| `check_account_compatibility` | Verify modules work in your account/region |

### Scenario Building

| Tool | Description |
|------|-------------|
| `validate_scenario` | Validate a blueprint before deployment |
| `create_scenario` | Deploy a scenario with auto-healing |
| `search_templates` | Browse reusable scenario templates |

### Scenario Management (CRUD)

| Tool | Description |
|------|-------------|
| `list_scenarios` | List all scenarios in your team |
| `get_scenario` | Get scenario details by ID |
| `get_scenario_blueprint` | Get the full blueprint JSON |
| `update_scenario` | Update name, blueprint, scheduling, or folder |
| `delete_scenario` | Permanently delete a scenario |

### Scenario Control

| Tool | Description |
|------|-------------|
| `activate_scenario` | Activate a scenario |
| `deactivate_scenario` | Stop a running scenario |
| `run_scenario` | Execute a scenario by ID with optional input data |

## Auto-Healing

The `create_scenario` tool automatically fixes common issues in AI-generated blueprints:

| Issue | Auto-Fix |
|-------|----------|
| Missing `metadata` | Injects full metadata block |
| Missing designer coordinates | Adds `{ x: 0, y: 0 }` to all modules |
| Router `filter` in routes | Strips unsupported property (configure in Make UI) |
| Schedule modules in flow | Converts to scenario-level scheduling |
| Wrong module versions | Injects verified versions, strips unknowns |
| Module not found (IM007) | 5-retry strategy with version fallback |

## Prompts & Resources

| Prompt | Description |
|--------|-------------|
| `build_scenario` | Guided scenario creation workflow |
| `explain_module` | Detailed module explanation with examples |

| Resource | Description |
|----------|-------------|
| `make://apps` | App catalog with module counts |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAKE_API_KEY` | For CRUD/run | — | Make.com API key |
| `MAKE_API_URL` | No | `https://eu1.make.com/api/v2` | API base URL (include zone) |
| `MAKE_TEAM_ID` | For CRUD | — | Team ID |
| `DATABASE_PATH` | No | `<package>/data/make-modules.db` | SQLite DB path |
| `LOG_LEVEL` | No | `info` | `debug`, `info`, `warn`, `error`, `silent` |

## Development

```bash
npm install && npm run build    # Build
npm test                        # Run 44 tests
npm run start:dev               # Dev mode (tsx)
```

## Credits

Original server by [Daniel Shashko](https://github.com/danishashko/make-mcp). CRUD tools added by [D1DX](https://github.com/D1DX).

MIT License.
