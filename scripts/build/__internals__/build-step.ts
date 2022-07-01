type BuildStep = {
    name: string;
    buildFn: () => unknown | Promise<unknown>;
};

export type { BuildStep };
