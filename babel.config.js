/**
 * @type {( api: import("@babel/core").ConfigAPI,
 *          module: false | "cjs"
 *        ) => import("@babel/core").TransformOptions}
 */
module.exports = (api, module) => {
    api.cache.forever();
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: { version: 3, proposals: true },
                    modules: module,
                },
            ],
            "@babel/preset-typescript",
        ],
        plugins: [
            "transform-typescript-metadata",
            [
                "@babel/plugin-proposal-decorators",
                {
                    version: "legacy",
                },
            ],
            [
                "module-resolver",
                {
                    root: ["."],
                    alias: {
                        "~": "./src",
                    },
                },
            ],
        ],
    };
};
