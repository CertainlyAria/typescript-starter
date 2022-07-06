import "~/modules/load-env";

import { buildSteps } from "./build-steps";

async function runBuildSteps() {
    for (const buildStep of buildSteps) {
        console.log("Running build step:");
        console.log(`  ${buildStep.name}`);
        await buildStep.buildFn();
        console.log(`  finished`);
    }
}

runBuildSteps();
