import { z } from "zod";

import { envSchema } from "./src/modules/load-env/env-schema";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.input<typeof envSchema> {}
    }
}

export {};
