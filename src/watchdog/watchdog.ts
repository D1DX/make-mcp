/**
 * Watchdog worker — runs in parallel to main, immune to main-thread CPU starvation.
 *
 * Why a worker thread?
 *   The orphan-of-orphan failure modes can cause make-mcp-server's main thread
 *   to enter a tight read-poll loop on a half-closed stdio pipe. While that
 *   happens, ALL setInterval / setTimeout callbacks in main are starved —
 *   including any in-process orphan watcher. Calling process.exit() from a
 *   worker thread terminates the WHOLE process, bypassing the stuck event loop.
 *
 * Two checks, polled every 2s:
 *   1. Main-thread liveness — main sends 'heartbeat' messages every 1s.
 *      If no heartbeat received for >10s, main is hung — exit.
 *   2. Grandparent liveness — process.kill(grandparentPid, 0). If ESRCH,
 *      the actual MCP host (Claude, etc.) died — exit.
 *
 * Either condition triggers process.exit() with a distinct code.
 */
import { parentPort, workerData } from 'node:worker_threads';

interface WatchdogData {
    grandparentPid: number | null;
}

const data = workerData as WatchdogData;
const grandparentPid = data?.grandparentPid ?? null;

const HEARTBEAT_TIMEOUT_MS = 10_000;
const POLL_INTERVAL_MS = 2_000;

let lastHeartbeat = Date.now();

parentPort?.on('message', (msg) => {
    if (msg === 'heartbeat') lastHeartbeat = Date.now();
});

setInterval(() => {
    // Main-thread liveness
    if (Date.now() - lastHeartbeat > HEARTBEAT_TIMEOUT_MS) {
        process.stderr.write('[watchdog] main thread unresponsive >10s — exiting process\n');
        process.exit(2);
    }
    // Grandparent liveness
    if (grandparentPid !== null) {
        try {
            process.kill(grandparentPid, 0);
        } catch (e: any) {
            if (e?.code === 'ESRCH') {
                process.stderr.write(`[watchdog] grandparent (pid=${grandparentPid}) died — exiting process\n`);
                process.exit(3);
            }
            // EPERM means PID alive but not ours (recycled to another user) — treat as alive.
        }
    }
}, POLL_INTERVAL_MS);
