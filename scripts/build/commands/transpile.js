import path from "node:path";

import { asyncSpawn } from "../../async-spawn";

/**
 * @param {string} srcDir
 * @param {string} distDir
 * @param {boolean} watch
 * @returns {Promise<undefined>}
 */
export function transpile(srcDir, distDir, watch = false) {
    const babel =
        `npx babel ${srcDir}` +
        " --source-maps" +
        " --copy-files --no-copy-ignored" +
        " --extensions '.ts,.cts,.mts,.js,.cjs,.mjs'" +
        ` --ignore '"**/*.test.ts","**/*.test.js","src/test/**/*","__tests__/**/*"'` +
        ` --out-dir ${path.join(distDir)}` +
        ` ${watch ? " --watch" : ""}`;

    return asyncSpawn(babel);
}
