# D1DX/make-mcp — RETIRED 2026-05-08

> **This stdio-fork MCP server is no longer maintained.** Migrate to the official Make.com cloud MCP.

---

## Why retired

Three orphan-storm failure modes (1–3) were patched in v1.4.0–v1.4.2, but a fourth mode (libuv read-callback CPU loop on macOS Sequoia) emerged in v1.4.2 and proved difficult to detect from inside the runaway process. Rather than continue patching a stdio-spawn-based architecture, D1DX migrated all its MCP consumers to Make.com's first-party cloud MCP (Streamable HTTP, no spawned processes).

## How to migrate

Make.com publishes an official Streamable HTTP MCP at:

- `https://eu1.make.com/mcp/stateless` (EU1 region)
- `https://eu2.make.com/mcp/stateless` (EU2 region)

Auth is `Authorization: Bearer <MAKE_API_KEY>` (mint at https://www.make.com/en/help/api/working-with-tokens).

### Claude Code (`.mcp.json`)

```json
{
  "mcpServers": {
    "make": {
      "type": "http",
      "url": "https://eu1.make.com/mcp/stateless",
      "headers": {
        "Authorization": "Bearer <MAKE_API_KEY>"
      }
    }
  }
}
```

### Codex (`.codex/config.toml`)

```toml
[mcp_servers.make]
url = "https://eu1.make.com/mcp/stateless"

[mcp_servers.make.http_headers]
Authorization = "Bearer <MAKE_API_KEY>"
```

### Gemini CLI (`.gemini/settings.json`)

```json
{
  "mcpServers": {
    "make": {
      "httpUrl": "https://eu1.make.com/mcp/stateless",
      "headers": {
        "Authorization": "Bearer <MAKE_API_KEY>"
      }
    }
  }
}
```

## Stub behavior

Any `npx -y github:D1DX/make-mcp` install of this repo (version `99.0.0-retired`) will:

1. Print a deprecation banner to stderr during `postinstall` (exit 0 so package managers don't crash).
2. Print the same banner and exit 1 on any subsequent `make-mcp-server` invocation.

The stub has no dependencies and no build step.

## Historical reference

For the orphan-storm investigation that drove this retirement, see `tasks/NO-ID (make-mcp-orphan-research)/` in [D1DX/d1dx](https://github.com/D1DX/d1dx). The four documented failure modes:

| Mode | Trigger | Fix attempt |
|------|---------|-------------|
| 1 | Direct orphan, no wrapper | `70be8d6` (2026-04-25) — stdin-close handler |
| 2 | Orphan-of-orphan, stdin error event | `95899b1` (2026-04-29, v1.4.1) — bounded rejection counter |
| 3 | Orphan-of-orphan, no stdin error | `129ba7b` (2026-05-01, v1.4.2) — out-of-process worker watchdog |
| 4 | libuv read-callback CPU loop on Sequoia (no rejection event, watchdog falsely-live) | unfixed — retired |

## License

MIT (see `LICENSE`).
