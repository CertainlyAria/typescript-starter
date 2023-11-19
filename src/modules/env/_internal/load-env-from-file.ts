import dotenv from "dotenv";

function loadEnvFile(filePath: string) {
    // eslint-disable-next-line import/no-named-as-default-member
    const { error } = dotenv.config({
        path: filePath,
    });
    return error;
}

export { loadEnvFile };
