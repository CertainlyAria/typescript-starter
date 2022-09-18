import { asyncSpawn } from "../../async-spawn";

/**
 * @param {string} tsConfigPath
 * @return {Promise<undefined>}
 */
export function tsc(tsConfigPath) {
    return asyncSpawn(`npx tsc --project ${tsConfigPath}`);
}
