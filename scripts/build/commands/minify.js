import fs from "node:fs";
import path from "node:path";
import * as UglifyJs from "uglify-js";

/**
 * @type {import("uglify-js").MinifyOptions}
 */
const UGLIFY_JS_OPTIONS = {
    toplevel: false,
    mangle: false,
    compress: {
        collapse_vars: false,
        keep_infinity: true,
        keep_fargs: true,
    },
};

/**
 * @param {string} dir
 * @returns {Promise<number>}
 */
export async function minify(dir) {
    let errorOccured = false;

    /**
     * @type {Array<Promise<unknown>>}
     */
    const minifyPromises = [];

    for (const jsFilePath of getJsFiles(dir)) {
        const sourceMapPath = `${jsFilePath}.map`;
        const jsSourceCodePromise = fs.promises.readFile(jsFilePath, "utf8");
        const jsSourceMapPromise = fs.promises.readFile(sourceMapPath, "utf8");

        const minifyPromise = Promise.all([
            jsSourceCodePromise,
            jsSourceMapPromise,
        ])
            .then(([jsSourceCode, jsSourceMap]) => {
                return UglifyJs.minify(jsSourceCode, {
                    ...UGLIFY_JS_OPTIONS,
                    sourceMap: {
                        /** @type {any} */
                        content: jsSourceMap,
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
        return 1;
    } else {
        return 0;
    }
}

/**
 * @param {string} dir
 * @returns {Generator<string, undefined, undefined>}
 */
function* getJsFiles(dir) {
    const files = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((file) => {
            return (
                file.isDirectory() ||
                path.extname(file.name).toLowerCase() === ".js"
            );
        });

    for (const file of files) {
        if (file.isDirectory()) {
            yield* getJsFiles(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }

    return;
}
