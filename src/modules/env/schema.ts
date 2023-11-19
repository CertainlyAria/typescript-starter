import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    EXPRESS_PORT: z.string().pipe(z.coerce.number().int().min(0).max(65535)),
});

export { envSchema };
