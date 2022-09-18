import fs from "fs-extra";
import { getTsconfig } from "get-tsconfig";
import { exit } from "node:process";
import { minify } from "uglify-js";

import { lint } from "./commands/lint";
import { runTests } from "./commands/run-tests";
import { transpile } from "./commands/transpile";
import { tsc } from "./commands/tsc";

const tsConfig = "tsconfig.prod.json";

if (!fs.existsSync(tsConfig)) {
    console.error(`TypeScript config ${tsConfig} was not found. aborting...`);
    exit(1);
}

const tsConfigOutDir = getTsconfig(undefined, tsConfig)?.config.compilerOptions
    ?.outDir;

const defaultOutDir = "dist";
const sourceDir = "src";
const outDir = tsConfigOutDir || "dist";

if (!tsConfigOutDir) {
    console.log(`no out dir specified in ${tsConfig}, using ${defaultOutDir}`);
}

await tsc("./scripts/tsconfig.json");

await lint(sourceDir);

await runTests();

// eslint-disable-next-line import/no-named-as-default-member
fs.removeSync(outDir);

await tsc(tsConfig);

await transpile(sourceDir, outDir);

minify(outDir);
