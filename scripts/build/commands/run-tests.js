import { asyncSpawn } from "../../async-spawn";

/**
 * @returns {Promise<undefined>}
 */
export function runTests() {
    return asyncSpawn("npm run test");
}
