import dotenv from "dotenv";

function loadEnvFile(filePath: string) {
    const { error } = dotenv.config({
        path: filePath,
    });
    return error;
}

export { loadEnvFile };
