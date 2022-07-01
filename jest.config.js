/**
 * @returns {Promise<import("@jest/types").Config.InitialOptions>}
 */
module.exports = async () => {
    return {
        transform: {
            "\\.[jt]sx?$": [
                "babel-jest",
                { configFile: "./babel.config.cjs.js" },
            ],
        },

        testEnvironment: "node",

        collectCoverageFrom: [
            "**/*.{js,ts}",
            "!**/*.d.ts",
            "!**/node_modules/**",
        ],

        setupFilesAfterEnv: ["./src/test/setup-tests.ts"],

        verbose: true,
    };
};
