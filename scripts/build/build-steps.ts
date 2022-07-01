import { execSync } from "child_process";
import { copy, remove } from "fs-extra";
import path from "path";

import { BuildStep } from "./__internals__/build-step";
import { getDistDir } from "./__internals__/get-dist-dir";
import { minify } from "./__internals__/minify";

const buildSteps: Array<BuildStep> = [
    {
        name: "lint",
        buildFn: () => {
            execSync("npm run lint -- src", {
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
            execSync(
                "babel src --config-file ./babel.config.mjs.js" +
                    " --source-maps" +
                    " --copy-files --no-copy-ignored" +
                    ` --out-dir ${path.join(distDir, "mjs")}` +
                    " --extensions '.ts,.cts,.mts,.js,.cjs,.mjs'" +
                    ` --ignore "**/*.test.ts","**/*.test.js","src/test/**/*"`,
            );
            execSync(
                "babel src --config-file ./babel.config.cjs.js" +
                    " --source-maps" +
                    " --copy-files --no-copy-ignored" +
                    ` --out-dir ${path.join(distDir, "cjs")}` +
                    " --extensions '.ts,.cts,.mts,.js,.cjs,.mjs'" +
                    ` --ignore "**/*.test.ts","**/*.test.js","src/test/**/*"`,
            );
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