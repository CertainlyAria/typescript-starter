import dotenv from "dotenv";
import fs from "fs";

function loadEnvFile(filePath: string) {
    if (fs.existsSync(filePath)) {
        const { error } = dotenv.config({
            path: filePath,
        });
        if (error) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export { loadEnvFile };
