// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelConfig = require("./babel.config");

/**
 * @type {import("@babel/core").ConfigFunction}
 */
module.exports = (api) => {
    return babelConfig(api, false);
};
