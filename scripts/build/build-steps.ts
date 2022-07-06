import { execSync } from "child_process";
import { copy, remove } from "fs-extra";
import path from "path";

import { BuildStep } from "./__internals__/build-step";
import { getDistDir } from "./__internals__/get-dist-dir";
import { minify } from "./__internals__/minify";

const buildSteps: Array<BuildStep> = [
    {
        name: 'check types under "./script" directory',
        buildFn: () => {
            execSync("tsc --project ./scripts/tsconfig.json", {
                stdio: "inherit",
            });
        },
    },
    {
        name: "lint",
        buildFn: () => {
            execSync("npm run lint -- src", {
                stdio: "inherit",
            });
        },
    },
    {
        name: "Run tests",
        buildFn: () => {
            execSync("npm run test", {
                stdio: "inherit",
            });
        },
    },
    {
        name: "Clean Contents of Dist Directory",
        buildFn: async () => {
            await remove(getDistDir());
        },
    },
    {
        name: "Perform type checking and generate .d.ts files",
        buildFn: () => {
            execSync("tsc --project tsconfig.prod.json", {
                stdio: "inherit",
            });
        },
    },
    {
        name: "Transpile src files",
        buildFn: () => {
            const distDir = getDistDir();
            const originalEsmTarget = process.env.BABEL_TRANSFORM_ESM_TARGET;
            const babelCommand =
                "babel src" +
                " --source-maps" +
                " --copy-files --no-copy-ignored" +
                " --extensions '.ts,.cts,.mts,.js,.cjs,.mjs'" +
                ` --ignore "**/*.test.ts","**/*.test.js","src/test/**/*","__tests__/**/*"`;

            // build esm modules
            process.env.BABEL_TRANSFORM_ESM_TARGET = "false";
            execSync(babelCommand + ` --out-dir ${path.join(distDir, "mjs")}`);

            // build cjs modules
            process.env.BABEL_TRANSFORM_ESM_TARGET = "cjs";
            execSync(babelCommand + ` --out-dir ${path.join(distDir, "cjs")}`);

            // revert env changes
            process.env.BABEL_TRANSFORM_ESM_TARGET = originalEsmTarget;
        },
    },
    {
        name: "Minify Output",
        buildFn: async () => {
            await minify(getDistDir());
        },
    },
    {
        name: "Copy Types",
        buildFn: async () => {
            const distDir = getDistDir();
            await copy(path.join(distDir, "types"), path.join(distDir, "cjs"));
            await copy(path.join(distDir, "types"), path.join(distDir, "mjs"));
            await remove(path.join(distDir, "types"));
        },
    },
];

export { buildSteps };
