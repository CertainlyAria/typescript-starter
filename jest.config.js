/**
 * @type {()=>Promise<import("jest").Config>}
 */
export default async () => {
    return {
        transform: {
            "\\.[jt]sx?$": "babel-jest",
        },
        extensionsToTreatAsEsm: [".ts"],

        testEnvironment: "node",

        testPathIgnorePatterns: ["/node_modules/", ".build/"],

        collectCoverageFrom: [
            "**/*.{js,ts}",
            "!**/*.d.ts",
            "!.build/",
            "!**/node_modules/**",
        ],

        setupFilesAfterEnv: ["./src/test/setup-tests.ts"],
        verbose: true,
    };
};
