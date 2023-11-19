/**
 * @type {import("prettier").Config}
 */
export default {
    tabWidth: 4,
    trailingComma: "all",
    /* keep in sync with
           rules["max-len"].code
         in .eslintrc.json
    */
    printWidth: 80,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
    importOrder: [
        "(^([A-Za-z0-9@]).*)",
        "",
        "<BUILT_IN_MODULES>",
        "",
        "^~",
        "",
        "^\\.\\.",
        "",
        "^\\.",
        "",
    ],
    importOrderParserPlugins: ["typescript"],
    importOrderTypeScriptVersion: "5.2.2",
};
