#!/usr/bin/env node

/**
 * make-mcp-server — RETIRED 2026-05-08
 *
 * The D1DX/make-mcp stdio fork has been retired in favor of the
 * official Make.com cloud MCP at https://eu1.make.com/mcp/stateless
 * (or https://eu2.make.com/mcp/stateless for EU2 regions).
 *
 * Three orphan-storm failure modes (modes 1–3) were patched, but a
 * fourth mode (libuv read-callback CPU loop) emerged in v1.4.2 and
 * proved difficult to detect from inside the runaway process.
 *
 * Migration:
 *   - Claude Code: { "type": "http", "url": "https://eu1.make.com/mcp/stateless",
 *                    "headers": { "Authorization": "Bearer <MAKE_API_KEY>" } }
 *   - Codex:       [mcp_servers.make] url = "..."; http_headers = { Authorization = "Bearer ..." }
 *   - Gemini:      "httpUrl": "https://eu1.make.com/mcp/stateless", "headers": { ... }
 *
 * This stub exits non-zero so any stale spawn surfaces loudly. Any
 * downstream caller still wired to `npx -y github:D1DX/make-mcp` should
 * migrate to the cloud MCP per the snippet above.
 */

const message = [
  '',
  '================================================================',
  '  D1DX/make-mcp HAS BEEN RETIRED (2026-05-08)',
  '================================================================',
  '',
  '  The stdio-fork make-mcp-server is no longer maintained and',
  '  must not be invoked. Use the official Make.com cloud MCP:',
  '',
  '    https://eu1.make.com/mcp/stateless   (EU1)',
  '    https://eu2.make.com/mcp/stateless   (EU2)',
  '',
  '  Auth: Authorization: Bearer <MAKE_API_KEY>',
  '',
  '  See https://github.com/D1DX/make-mcp/blob/main/README.md for',
  '  the migration snippet for Claude Code, Codex, and Gemini.',
  '',
  '================================================================',
  '',
].join('\n');

process.stderr.write(message);
process.exit(1);
