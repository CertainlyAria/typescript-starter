/**
 * @type {import("@babel/core").ConfigFunction}
 */
module.exports = (api) => {
    api.cache.forever();
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: { version: 3, proposals: true },
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
