import fs from "fs";
import path from "path";
import { exit } from "process";
import { minify as minifyJs } from "uglify-js";

import { getJsFilesGenerator } from "./get-js-files-generator";
import { uglifyJsOptions } from "./uglify-js-options";

async function minify(dir: string) {
    let errorOccured = false;
    const minifyPromises: Array<Promise<unknown>> = [];

    for (const jsFilePath of getJsFilesGenerator(dir)) {
        const sourceMapPath = `${jsFilePath}.map`;
        const jsSourceCodePromise = fs.promises.readFile(jsFilePath, "utf8");
        const jsSourceMapPromise = fs.promises.readFile(sourceMapPath, "utf8");

        const minifyPromise = Promise.all([
            jsSourceCodePromise,
            jsSourceMapPromise,
        ])
            .then(([jsSourceCode, jsSourceMap]) => {
                return minifyJs(jsSourceCode, {
                    ...uglifyJsOptions,
                    sourceMap: {
                        content: jsSourceMap as any,
                        url: `./${path.basename(sourceMapPath)}`,
                    },
                });
            })
            .then((minifiedJsCode) => {
                fs.promises.writeFile(jsFilePath, minifiedJsCode.code);
                fs.promises.writeFile(sourceMapPath, minifiedJsCode.map);
            })
            .catch((error) => {
                console.error(`Error while minifying ${jsFilePath}`);
                console.error(error);
                errorOccured = true;
            });

        minifyPromises.push(minifyPromise);
    }

    await Promise.all(minifyPromises);

    if (errorOccured) {
        exit(1);
    }
}

export { minify };
