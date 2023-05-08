import { z } from "zod";

import { envSchema } from "./src/modules/env/schema";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.input<typeof envSchema> {}
    }
}

export {};
