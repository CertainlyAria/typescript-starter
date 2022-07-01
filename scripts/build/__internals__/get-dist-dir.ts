function getDistDir(): string {
    const commandLineArgs = process.argv.slice(2);
    const distDir = commandLineArgs[0];
    if (distDir == undefined) {
        throw new Error("Error: no distDir was passed");
    }
    return distDir;
}

export { getDistDir };
