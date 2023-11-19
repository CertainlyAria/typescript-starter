import { type z } from "zod";

import { envSchema } from "../schema";

function getNODE_ENV(): z.infer<typeof envSchema.shape.NODE_ENV> {
    const initialEnvParseResult = envSchema
        .pick({ NODE_ENV: true })
        .safeParse(process.env);

    if (!initialEnvParseResult.success) {
        const { fieldErrors } = initialEnvParseResult.error.flatten();
        throw new Error(
            "environment variables are not set correctly " +
                JSON.stringify(fieldErrors, undefined, 4),
        );
    }

    const {
        data: { NODE_ENV },
    } = initialEnvParseResult;

    return NODE_ENV;
}

export { getNODE_ENV };
