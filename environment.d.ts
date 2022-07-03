declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            BABEL_TRANSFORM_ESM_TARGET?:
                | "amd"
                | "umd"
                | "systemjs"
                | "commonjs"
                | "cjs"
                | "auto"
                | "false"
                | "true";
        }
    }
}

export {};
