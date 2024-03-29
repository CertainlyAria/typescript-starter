import fs from "fs";

import { getNODE_ENV } from "./_internal/get-node-env";
import { loadEnvFile } from "./_internal/load-env-from-file";
import { envSchema } from "./schema";

const NODE_ENV = getNODE_ENV();

const envFilePaths = [
    `.env.${NODE_ENV}.local`,
    `.env.local`,
    `.env.${NODE_ENV}`,
    `.env`,
].filter((path) => {
    if (NODE_ENV == "test" && path == ".env.local") {
        return false;
    } else {
        return true;
    }
});

const loadedEnvFiles: string[] = [];
const failedEnvFiles: Array<{ path: string; errorMsg?: string }> = [];

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
            loadedEnvFiles.reduce((prev, path) => {
                return prev + `\n  ${path}`;
            }, "") +
            (failedEnvFiles.length > 0 ? "\nfailed env files" : "") +
            failedEnvFiles.reduce((prev, failedPath) => {
                return prev + `\n ${failedPath.errorMsg}`;
            }, "") +
            "\n",
    );
}

const env = envParseResult.data;
export { env };
