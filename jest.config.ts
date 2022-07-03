import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        transform: {
            "\\.[jt]sx?$": "babel-jest",
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
