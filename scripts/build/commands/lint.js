import { asyncSpawn } from "../../async-spawn";

/**
 * @param {string} srcDir
 * @returns {Promise<undefined>}
 */
export function lint(srcDir) {
    return asyncSpawn(`npm run _eslint -- ${srcDir}`);
}
