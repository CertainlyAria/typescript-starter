import { spawn } from "node:child_process";
import { parseArgsStringToArgv } from "string-argv";

/**
 * @param {string} command
 * @returns {Promise<undefined>}
 */
export function asyncSpawn(command) {
    return new Promise((resolve, reject) => {
        const args = parseArgsStringToArgv(command);
        const cmd = args.shift();
        if (cmd) {
            const child = spawn(cmd, args, {
                env: process.env,
                shell: true,
                stdio: "inherit",
            });

            child.on("exit", (code, signal) => {
                if (signal) {
                    reject(signal);
                } else {
                    if (code === 0) {
                        resolve(undefined);
                    } else {
                        reject(code);
                    }
                }
            });
        } else {
            reject(new Error("parseArgsStringToArgv has failed"));
        }
    });
}
