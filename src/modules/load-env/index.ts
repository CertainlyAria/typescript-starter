import fs from "fs";

import { getNODE_ENV } from "./__internals__/get-node-env";
import { loadEnvFile } from "./__internals__/load-env-from-file";
import { envSchema } from "./env-schema";

const NODE_ENV = getNODE_ENV();

const envFilePaths = [];
const loadedEnvFiles: string[] = [];
const failedEnvFiles: Array<{ path: string; errorMsg?: string }> = [];

if (NODE_ENV == "production") {
    envFilePaths.push(
        ".env.production.local",
        ".env.local",
        ".env.production",
        ".env",
    );
} else if (NODE_ENV == "development") {
    envFilePaths.push(
        ".env.development.local",
        ".env.local",
        ".env.development",
        ".env",
    );
} else if (NODE_ENV == "test") {
    envFilePaths.push(".env.test.local", ".env.test", ".env");
}

for (const filePath of envFilePaths) {
    if (fs.existsSync(filePath)) {
        const error = loadEnvFile(filePath);
        if (error == undefined) {
            loadedEnvFiles.push(filePath);
        } else {
            failedEnvFiles.push({
                path: filePath,
                errorMsg: error?.message,
            });
        }
    }
}

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
    const { fieldErrors } = envParseResult.error.flatten();

    throw new Error(
        "environment variables are not set correctly " +
            JSON.stringify(fieldErrors, undefined, 4) +
            "\nloaded env files (in order):" +
            loadedEnvFiles.reduce((prev, path, i) => {
                return prev + `\n  ${path}`;
            }, "") +
            (failedEnvFiles.length > 0 ? "\nfailed env files" : "") +
            failedEnvFiles.reduce((prev, failedPath, i) => {
                return prev + `\n ${failedPath.errorMsg}`;
            }, "") +
            "\n",
    );
}

const tsEnv = envParseResult.data;
export { tsEnv };
