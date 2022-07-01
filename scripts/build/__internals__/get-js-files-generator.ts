import fs from "fs";
import path from "path";

function* getJsFilesGenerator(
    dir: string,
): Generator<string, undefined, undefined> {
    const files = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((file) => {
            return (
                file.isDirectory() ||
                path.extname(file.name).toLowerCase() === ".js"
            );
        });

    for (const file of files) {
        if (file.isDirectory()) {
            yield* getJsFilesGenerator(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }

    return;
}

export { getJsFilesGenerator };
