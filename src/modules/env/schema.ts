import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    EXPRESS_PORT: z
        .string()
        .superRefine((val, ctx) => {
            const castResult = z
                .preprocess(
                    (val) => parseFloat(val as string),
                    z.number().int().min(0).max(65535),
                )
                .safeParse(val);

            if (!castResult.success) {
                for (const castIssue of castResult.error.errors) {
                    ctx.addIssue(castIssue);
                }
            }
        })
        .transform((val) => parseInt(val)),
});

export { envSchema };
