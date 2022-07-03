/**
 * @type {(
 *            api: import("@babel/core").ConfigAPI,
 *        ) => import("@babel/core").TransformOptions}
 */
module.exports = (api) => {
    api.cache.forever();
    let moduleTarget;
    const envTransformTarget = process.env.BABEL_TRANSFORM_ESM_TARGET;
    if (envTransformTarget == "false") {
        moduleTarget = false;
    } else if (
        envTransformTarget == "true" ||
        envTransformTarget == undefined
    ) {
        moduleTarget = "auto";
    } else {
        moduleTarget = envTransformTarget;
    }
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: { version: 3, proposals: true },
                    modules: moduleTarget,
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
