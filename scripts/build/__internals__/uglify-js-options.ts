import type { MinifyOptions } from "uglify-js";

const uglifyJsOptions: MinifyOptions = {
    toplevel: false,
    mangle: false,
    compress: {
        collapse_vars: false,
        keep_infinity: true,
        keep_fargs: true,
    },
};

export { uglifyJsOptions };
