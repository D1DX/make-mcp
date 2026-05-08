/**
 * postinstall — RETIRED 2026-05-08
 *
 * The D1DX/make-mcp stdio fork has been retired. This postinstall
 * emits a clear deprecation banner to stderr and exits 0 so package
 * managers do not crash mid-install for unrelated upstream consumers
 * — but any subsequent `make-mcp-server` invocation will exit 1 with
 * the migration instructions (see bin/make-mcp.js).
 */

const banner = [
  '',
  '================================================================',
  '  D1DX/make-mcp HAS BEEN RETIRED (2026-05-08)',
  '================================================================',
  '',
  '  Migrate to the official Make.com cloud MCP:',
  '    https://eu1.make.com/mcp/stateless',
  '    https://eu2.make.com/mcp/stateless',
  '',
  '  Bearer-auth header: Authorization: Bearer <MAKE_API_KEY>',
  '',
  '  Any spawn of `make-mcp-server` from this version will exit 1.',
  '',
  '================================================================',
  '',
].join('\n');

process.stderr.write(banner);
process.exit(0);
