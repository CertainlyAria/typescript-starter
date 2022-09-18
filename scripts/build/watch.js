import fs from "fs-extra";
import { transpile } from "./commands/transpile";

const devBuildDir = ".build";

if (fs.existsSync(devBuildDir)) {
    fs.emptyDirSync(devBuildDir);
}

try {
    await transpile("src", devBuildDir, true);
} catch (error) {
    console.log(error);
}
