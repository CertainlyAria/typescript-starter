import { loadEnvFile } from "./__internals__/load-env-from-file";

const nodeEnv = process.env["NODE_ENV"];

const PROD_ENV_STRING = "production";
const DEV_ENV_STRING = "development";
const TEST_ENV_STRING = "test";

const validNodeEnvs = [PROD_ENV_STRING, DEV_ENV_STRING, TEST_ENV_STRING];

function printValidNodeEnvsMessage() {
    console.log(
        "valid values for NODE_ENV are: ",
        validNodeEnvs.reduce((prev, curr, index) => {
            if (index == 0) {
                return `"${curr}"`;
            }
            return `${prev}, "${curr}"`;
        }, ""),
    );
}

if (nodeEnv == undefined) {
    console.error("NODE_ENV environment variable is not defined");
    printValidNodeEnvsMessage();
    process.exit(1);
}

if (validNodeEnvs.indexOf(nodeEnv) == -1) {
    console.error(
        `NODE_ENV environment variable has invalid value: ${nodeEnv}`,
    );
    printValidNodeEnvsMessage();
    process.exit(2);
}

if (nodeEnv == PROD_ENV_STRING) {
    loadEnvFile(".env.production.local");
    loadEnvFile(".env.local");
    loadEnvFile(".env.production");
    loadEnvFile(".env");
} else if (nodeEnv == DEV_ENV_STRING) {
    loadEnvFile(".env.development.local");
    loadEnvFile(".env.local");
    loadEnvFile(".env.development");
    loadEnvFile(".env");
} else if (nodeEnv == TEST_ENV_STRING) {
    loadEnvFile(".env.test.local");
    loadEnvFile(".env.test");
    loadEnvFile(".env");
}
