import fs from "fs-extra";

import { transpile } from "./commands/transpile";

const devBuildDir = ".build";

if (fs.existsSync(devBuildDir)) {
    // eslint-disable-next-line import/no-named-as-default-member
    fs.emptyDirSync(devBuildDir);
}

try {
    await transpile("src", devBuildDir, true);
} catch (error) {
    console.log(error);
}
