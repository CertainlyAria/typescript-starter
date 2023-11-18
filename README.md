<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />

<div align="center">
    <h3 align="center">Documented Typescript Starter Kit</h3>
    <p align="center">
        Documented TypeScript Template to Speed Up New Project Setup
        <br />
        <a href="https://codesandbox.io/s/github/CertainlyAria/typescript-starter">CodeSandbox.io</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="https://github.com/CertainlyAria/typescript-starter/issues">Report a Bug or Request a Feature</a>
    </p>
</div>

Features

<ol>
    <li><a href="#-some-useful-commands">🧩 Some Useful Commands</a></li>
    <li>
        <a href="#%EF%B8%8F-strict-typescript-configuration">
            ☑️ Strict TypeScript Configuration
        </a>
    </li>
    <li><a href="#-static-code-analysis-with-eslint">✅ Static Code Analysis with ESLint</a></li>
    <li><a href="#-consistent-formatting-with-prettier">🎨 Consistent Formatting with Prettier</a></li>
    <li><a href="#-import-order-rules">📜 Import Order Rules</a></li>
    <li>
        <a href="#-automatic-process-restart-during-development-with-nodemon">
            👨‍💻 Automatic Process Restart During Development With Nodemon
        </a>
    </li>
    <li>
        <a href="#-use-new-javascript-features-in-older-node-versions">
            ✨ Use New JavaScript Features In Older Node Versions
        </a>
    </li>
    <li><a href="#%EF%B8%8F-root-imports">⛓️ Root Imports</a></li>
    <li><a href="#-jest-for-running-tests">🧪 Jest For Running Tests</a></li>
    <li>
        <a href="#-import-guard-for-__internals__-directory">
            💂 Import Guard for "__internals__" directory
        </a>
    </li>
    <li><a href="#-env-files--type-safe-environment-variables">🌐 .env files & Type Safe Environment Variables</a></li>
    <li><a href="#-compatible-with-npm-yarn--pnpm">📦 Compatible with npm, yarn & pnpm</a></li>
    <li><a href="#%EF%B8%8F-recommended-vs-code-settings--extensions">⚙️ Recommended VS-Code Settings & Extensions</a></li>
    <li>
        <a href="#-consistent-commit-messages-with-commitizen">
            📝 Consistent Commit Messages with Commitizen
        </a>
    </li>
    <li>
        <a href="#-a-simple-build-pipeline">🧱 A Simple Build Pipeline</a>
        <ol>
            <li>
                <a href="#perform-type-checking-on-the-contents-of-scripts-directory">
                    Perform Type Checking on the Contents of /scripts Directory
                </a>
            </li>
            <li><a href="#check-for-linting-problems">Check for Linting Problems</a></li>
            <li><a href="#check-for-failed-tests">Check for Failed Tests</a></li>
            <li>
                <a href="#generate-types-dts-files-for-the-src-directory">
                    Generate Types (.d.ts files) for the /src Directory
                </a>
            </li>
            <li>
                <a href="#compile-both-commonjs--ecma-modules">
                    Transpile using babel
                </a>
            </li>
            <li><a href="#minify-the-output">Minify</a></li>
        </ol>
    </li>
</ol>

<hr />

# How To Use

## Using GitHub Templates

This project is configured as a Github template. You can create new repositories using this template by clicking on `Use this template` button or [this link](https://github.com/CertainlyAria/typescript-starter/generate).

## Fresh Start

```bash
git clone https://github.com/CertainlyAria/typescript-starter.git new-project

cd new-project

rm -rf .git

git init
```

## Keeping the Commit History

```bash
git clone https://github.com/CertainlyAria/typescript-starter.git new-project

cd new-project

git remote remove origin
```

<p align="right">(<a href="#top">back to top</a>)</p>

# Compatibility Note

Out of the box, you can use this template with node `v20.6.0` and above. If you are on node `v20.5.1` or below, open `package.json` and replace all 3 instances of `--import tsx/esm` with `--loader tsx/esm`

# 🧩 Some Useful Commands

These commands are defined in `package.json` file, inside the `scripts` object. You can run each command by prefixing it with `npm run `. For example: `npm run dev` or `npm run build`. Some commands require additional parameters.

## `dev`

Runs `src/index.ts` in watch mode. When you change a file, the old process will get killed & `src/index.ts` runs again.

See [Automatic Process Restart During Development With Nodemon](#-automatic-process-restart-during-development-with-nodemon) for more info.

## `build`

Creates a production build. See [A Simple Build Pipeline](#-a-simple-build-pipeline) for more info.

## `test:watch`

Runs your tests in watch mode. When you change a file, the tests will run again.

See [Jest For Running Tests](#-jest-for-running-tests) for more info.

## `test`

Runs all of your tests once.

See [Jest For Running Tests](#-jest-for-running-tests) for more info.

## `check:formatting`

**Requires:** path to a file or directory

### Example

```bash
npm run check:formatting src
```

Checks formatting issues of a file (or files inside a given directory) using [Prettier](https://prettier.io/).
See [Consistent Formatting with Prettier](#-consistent-formatting-with-prettier) for more info.

## `lint`

**Requires:** path to a file or directory

### Example

```bash
npm run lint src
```

Checks linting issues of a file (or files inside a given directory) using [ESLint](https://eslint.org/).
See [Static Code Analysis with ESLint]() for more info.

## `format`

**Requires:** path to a file or directory

### Example

```bash
npm run format src
```

Formats a file (or files inside a given directory) using [Prettier](https://prettier.io/).
See [Consistent Formatting with Prettier]() for more info.

<p align="right">(<a href="#top">back to top</a>)</p>

# Feature Docs

## ☑️ Strict TypeScript Configuration

### Why?

From the [TypeScript Docs](https://www.typescriptlang.org/tsconfig#strict):

> The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options.

> ⚠️ **WARNING:** Future versions of TypeScript may introduce additional stricter checking under this flag, so upgrades of TypeScript might result in new type errors in your program. When appropriate and possible, a corresponding flag will be added to disable that behavior.

### How?

You can find the rules in `tsconfig.json`, inside `compilerOptions` object, under `// Code quality` section.

For example, if you want all the strict rules but you want to allow [fall through in switch statements](https://www.youtube.com/watch?v=fM5qnyasUYI&t=89s), set `noFallthroughCasesInSwitch` to `false`.

<p align="right">(<a href="#top">back to top</a>)</p>

## ✅ Static Code Analysis with ESLint

### Why?

TypeScript's main goal is detecting type issues. Lots of other code quality issues fall outside of the scope of TypeScript. But you may want to enforce these checks in your project. This is where ESLint comes into play.

From the [ESLint Homepage](https://eslint.org/):

> ESLint statically analyzes your code to quickly find problems. It is built into most text editors

### How?

You can find the rules in `.eslintrc.json`, inside `rules` object.

For example, if you don't want ESLint to warn you when you use the `var` keyword, change `no-var` from `"warn"` to `"off"`.

`"no-var": "warn",`:

```typescript
function add(x: number, y: number) {
    var result = x + y; // 🟡 ESLint: Unexpected var, use let or const instead.

    return result;
}
```

<br />

`"no-var": "off",`:

```typescript
function add(x: number, y: number) {
    var result = x + y; // No problem is reported

    return result;
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

## 🎨 Consistent Formatting with Prettier

### Why?

You should not worry about code style & formatting. Tools such as prettier already handle that.

### How?

[Prettier](https://prettier.io/) handles formatting in this project. You can customize code style from `.prettierrc.js` file.
There is also a `.prettierignore` file which excludes files inside certain directories from being formatted.

Additionally, some stylings rules are configured inside `.eslintrc.json`. These rules come from [Prettier Plugin for ESLint](https://github.com/prettier/eslint-plugin-prettier). In `.eslintrc.json`, inside "extends" array, the last entry is `plugin:prettier/recommended`

<p align="right">(<a href="#top">back to top</a>)</p>

## 📜 Import Order Rules

### Why?

As the project size grows, so does the number of imports. Grouping `import` statements together can make distinguishing various import types easier.

### Example:

comments won't be present to the source code.

```typescript
//side effect imports
import "~/styles/index.css";

//imports from npm packages
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

//imports from other code written in this project
import { Layout } from "~/modules/layout";
import { useCurrentLocale } from "~/modules/use-locale";
import { useTheme } from "~/modules/use-theme";

//type imports
import type { AppProps } from "next/app";
```

### How?

These rules are enforced using ESLint & [Simple Import Sort ESLint Plugin](https://github.com/lydell/eslint-plugin-simple-import-sort). These rules are autofixable which means that you can quickly sort imports from your code editor.

![image](https://user-images.githubusercontent.com/44586130/178501787-ff443040-37cb-442d-84ba-74dd37180eca.png)

In `.eslintrc.json`, inside `rules` object, you can find the configured rule for `simple-import-sort/imports` plugin. If you want to disable this rule, change it `"warn"` to `"off"`. You can read more about customization options in [Simple Import Sort Docs](https://github.com/lydell/eslint-plugin-simple-import-sort)

<p align="right">(<a href="#top">back to top</a>)</p>

## 👨‍💻 Automatic Process Restart During Development With Nodemon

### Why?

From [DigitalOcean.com](https://www.digitalocean.com/community/tutorials/workflow-nodemon):

> In Node.js, you need to restart the process to make changes take effect. This adds an extra step to your workflow. You can eliminate this extra step by using nodemon to restart the process automatically.

### How?

From [nodemon docs](https://github.com/remy/nodemon):

> nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

In this project, nodemon is configured to transpile TypeScript files on the fly using Babel before running them. You can find `nodemon`'s configuration in `nodemon.json` file.

<p align="right">(<a href="#top">back to top</a>)</p>

## ✨ Use New JavaScript Features In Older Node Versions

### Why?

Sometimes you cannot use latest Node release. For example you may not have the permission to update node in the server. Under these scenarios, you can still use some of recent JS features. Under the hood, your code will get transpiled to older syntax.

### How?

[Babel](https://babeljs.io/) & [preset-env babel plugin](https://babeljs.io/docs/en/babel-preset-env) are used to transpile JavaScript. Configuration for these tools is in `babel.config.js` file.

Under the hood, `preset-env` uses another tool called [browserslist](https://github.com/browserslist/browserslist) to determine which syntax & features each environment supports. You can find the `browserslist` configuration in `package.json` file, inside `browserslist` object. Multiple keys allow you to specify different targets for development & production.

```jsonc
    "browserslist": {
        // when NODE_ENV is set to "production", transpile source code to support node 16
        "production": [
            "node 16"
        ],
        // when NODE_ENV is set to "development", transpile source code to support node 17.9
        // fewer transpiles increases speed during development
        "development": [
            "node 17.9"
        ]
    },
```

<p align="right">(<a href="#top">back to top</a>)</p>

## ⛓️ Root Imports

### Why?

Import paths can get very long & ugly in JavaScript/TypeScript.
With root imports you can use:

```typescript
import 'foo' from '~/modules/foo/bar.js';
```

instead of:

```typescript
import 'foo' from '../../../../../modules/foo/bar.js';
```

### How?

In `tsconfig.json`, inside `compilerOptions` object, `baseUrl` & `paths` are configured. This will allow correct resolution in code editors & ESLint. However TypeScript compiler DOES NOT rewrite the paths during compilation. See:
[microsoft/TypeScript#10866](https://github.com/microsoft/TypeScript/issues/10866),
[microsoft/TypeScript#16640](https://github.com/microsoft/TypeScript/issues/16640) &
[microsoft/TypeScript#26722](https://github.com/microsoft/TypeScript/issues/26722).

For correct output, another tool is required. Corrently rewriting tasks is done using `module-resolver` babel plugin. You can find `module-resolver`'s configuration in `babel.config.js`, inside `plugins` array.

> ⚠️ **Warning:** `baseUrl` & `paths` from `tsconfig.json` should be synchronozied with `root` & `alias` in `babel.config.js`

<p align="right">(<a href="#top">back to top</a>)</p>

## 🧪 Jest For Running Tests

### Why?

From [Jest's Website](https://jestjs.io/):

> Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.
> Jest is well-documented, requires little configuration and can be extended to match your requirements.

### How?

Jest works out of the box with babel. You can use the `jest.config.ts` file in this project to further customize Jest.

<p align="right">(<a href="#top">back to top</a>)</p>

## 💂 Import Guard for `__internals__` directory

### Why?

I use this pattern to prevent depending on implementation details.

### Example

We want to validate an object against a schema.

💩 Initial Implementation

```
// project structure

src
│   index.ts
└───modules
    └───validate-user
        │   index.ts
        │   user-schema.ts
```

```typescript
// src/modules/validate-user/user-schema.ts
import * as Yup from "yup";

const userSchema = Yup.object({}).required().shape({
    id: Yup.number().integer().positive().required(),
    name: Yup.string().required(),
});

export { userSchema };
```

```typescript
//src/modules/validate-user/index.ts
import * as Yup from "yup";

import { userSchema } from "./user-schema";

function isValidUser(data: unknown): data is Yup.InferType<typeof userSchema> {
    return userSchema.isValidSync(data);
}
```

💣 While this works, there is a catch.

`src/index.ts` can depend on `src/modules/validate-user/user-schema.ts`. Nothing prevents `src/index.ts` from doing this:

```typescript
// src/index.ts
import { userSchema } from "./modules/validate-user/user-schema";

const data = { name: "Aria" };

if (userSchema.isValidSync(data)) {
    // ...
} else {
    // ...
}
```

This problematic because `userSchema` is implementation detail of `validate-user` module.

Let's say one year from now, `validate-user` replaces `Yup` with `Zod`.

```typescript
// src/modules/validate-user/user-schema.ts - ONE YEAR LATER
import { z } from "zod";

const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
});

export { userSchema };
```

```typescript
//src/modules/validate-user/index.ts - ONE YEAR LATER
import { z } from "zod";

import { userSchema } from "./user-schema";

function isValidUser(data: unknown): data is z.infer<typeof userSchema> {
    const { success } = userSchema.safeParse(data);
    return success;
}
```

💥 `src/index.ts` is broken now. Because it dependend on a Yup schema, instead of relying on `isValidUser(data: unknown)` function

```typescript
// src/index.ts - ONE YEAR LATER
import { userSchema } from "./modules/validate-user/user-schema";

const data = { name: "Aria" };

// ❌ Property 'isValidSync' does not exist on type 'ZodObject'
if (userSchema.isValidSync(data)) {
    // ...
} else {
    // ...
}
```

<hr />

✅ Better Implementation

```
// project structure

src
│   index.ts
└───modules
    └───validate-user
        │    index.ts
        └─── __internals__
            │   user-schema.ts
```

```typescript
// src/modules/validate-user/__internals__/user-schema.ts
import * as Yup from "yup";

const userSchema = Yup.object({}).required().shape({
    id: Yup.number().integer().positive().required(),
    name: Yup.string().required(),
});

export { userSchema };
```

```typescript
//src/modules/validate-user/index.ts
import * as Yup from "yup";

import { userSchema } from "./__internals__/user-schema";

function isValidUser(data: unknown): data is Yup.InferType<typeof userSchema> {
    return userSchema.isValidSync(data);
}
```

Now ESLint will complain if `src/index.ts` tries to do something like:

```typescript
// src/index.ts
import { userSchema } from "~/modules/validate-user/__internals__/user-schema"; // 🔴 ESLint: '~/modules/validate-user/__internals__/user-schema' import is restricted from being used by a pattern. imports from "__internals__" directory are restricted to prevent importer from depending on implementation details.

const data = { name: "Aria" };

if (userSchema.isValidSync(data)) {
    // ...
} else {
    // ...
}
```

### How?

These rules are enforced using ESLint. In `.eslintrc.json`, inside `rules` object, you can find the configuration for `no-restricted-imports` rule.

If you want to disable this rule, change it from `"error"` to `"off"`.

<p align="right">(<a href="#top">back to top</a>)</p>

## 🌐 .env files & Type Safe Environment Variables

### Why?

In many cases, environment variables are not included in the repository. Thus when the repository is cloned, people have no idea what the environment variables are & what values are valid.
Of course you can create a separate document for explaining environment variables but just like comments, your document can easily get out of sync with the actual code.

In addition, environment variables have to get validated & proper error messages should be displayed.

Oh, one more thing, [environment variables are always strings](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/02e5cacc0c18632eca0d7082664ed8e21f6b4241/types/node/process.d.ts#L112). So if you want to get a number from environment variable (for example a `port number`) you have to perform type coercion.

All of this logic can be encapsulated in a `tsEnv` object. You can use this object to safely access environment variables. As you can see in the following demo, type coercion also works.

![ts-env](https://user-images.githubusercontent.com/44586130/178500585-c7eadbc2-8f68-4f93-96c2-9100011cfd62.gif)

### Load Order of Environment Variables

This project uses the same [load order as Next.JS](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order).

Environment variables are looked up in the following places, in order, stopping once the variable is found.

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when NODE_ENV is test.)
4. `.env.$(NODE_ENV)`
5. `.env`

For example, if `NODE_ENV` is `development` and you define a variable in both `.env.development.local` and `.env`, the value in `.env.development.local` will be used.

> 💡 **Note**: The allowed values for `NODE_ENV` are `production`, `development` and `test`.
> <br> <br>
> 🖊️ You can change the allowed values in `src/modules/load-env/env-schema.ts`

### How?

The schema for environment variables are defined using [Zod](https://github.com/colinhacks/zod) in `src/modules/load-env/env-schema.ts`.

If you take a closer look at `EXPRESS_PORT`, you'll notice that initially it is defined as string. But if all of the following conditions hold, at the end it will get transformed to a number.

1. it can be parsed using `parseFloat` function
2. the parsed value is a number
3. the number is an integer
4. it is not smaller than 0
5. it is not greater than 65535

Once you import `tsEnv` from `src/modules/load-env/env-schema.ts` file:

1. `.env` files will be loaded according to `NODE_ENV` value. (Under the hood, [dotenv](https://www.npmjs.com/package/dotenv) is used to load `.env` files.)
2. Variables will be validated & transformed based on the schema.
3. If no errors occur, you can access variables from `tsEnv` object.
4. In case of errors, an exception is thrown.

<p align="right">(<a href="#top">back to top</a>)</p>

## 📦 Compatible with npm, yarn & pnpm

This template doesn't contain any [`package.lock`](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json),[`yarn.lock`](https://classic.yarnpkg.com/lang/en/docs/yarn-lock/) or [`pnpm-lock.yaml`](https://pnpm.io/git#lockfiles) file.

You can run `npm install`, `yarn install` or `pnpm install` after cloning the template without getting any conflicts or warnings.

> ❗ You should always commit the lock file of your package manager.

<p align="right">(<a href="#top">back to top</a>)</p>

## ⚙️ Recommended VS-Code Settings & Extensions

### Why?

Sometimes you might want to share editor settings & extensions between project collaborators. Or you might want to use some settings only for a specific project. Most code editors have some solution for this scenario.

### How?

For VS Code, Project specific settings are stored in `.vscode/settings.json` & recomended extensions are stored in `.vscode/extensions.json`.
For example in this project, `editor.formatOnSave` is enabled.

<p align="right">(<a href="#top">back to top</a>)</p>

## 📝 Consistent Commit Messages with Commitizen

### Why?

["Conventional Commits"](https://www.conventionalcommits.org/en/v1.0.0/) is specification for adding human and machine readable meaning to commit messages.
Sticking to a commit message specification can make searching & browsing commits easier. In addition, you can use other tools like [Standard Version](https://github.com/conventional-changelog/standard-version) to automate changelog creation & versioning. (Standard Version is not included with this template).

### How?

This template uses [commitizen](https://github.com/commitizen/cz-cli) so you create "Conventional Commit Messages".

Run `npx cz` to generate a "Conventional Commit".

## 🧱 A Simple Build Pipeline

You can modify each step from `scripts/build/build-steps.ts` file. You can also add or remove build steps. The build steps in the array are executed from top to bottom. If an error occurs in a build step, build process will be cancelled and further steps won't get executed.

### Perform Type Checking on the Contents of /scripts Directory

TypeScript files are under `./scripts` directory are transpiled using Babel. Babel doesn't perform type checking. It simply removes type definitions from TypeScript source code.

This step makes sure that there are no type errors in `./scripts` before running them.

### Check for Linting Problems

ESLint checks for errors in `src` directory. If at least one error is found, `eslint` will fail and prevent further steps from getting executed.

Any number of warnings is fine. However you can configure this behavior using the `--max-warnings` flag.

You can learn more about customization options from [ESLint CLI Docs](https://eslint.org/docs/latest/user-guide/command-line-interface)

> 💡 Under the hood, this step executes `lint` script from `package.json`.

### Check for Failed Tests

There shouldn't be a failing test when you build for production. This step runs all your tests using [Jest](https://jestjs.io/). If at least one test is fails, `jest` will fail and prevent further steps from getting executed.

> 💡 Under the hood, this step executes `test` script from `package.json`.

### Generate Types (.d.ts files) for the /src Directory

There shouldn't be a type error test when you build for production. This step checks the types under `src` directory using TypeScript Compiler. If at least one error is found, `tsc` will fail and prevent further steps from getting executed. If no errors are found, type definitions `.d.ts` files will be generated.

> 💡 Under the hood, this step uses `tsconfig.prod.json` instead of `tsconfig.json` for TypeScript configuration. This is necessary in order to prevent generating type definitions for test files.

### Transpile Using Babel

Source code will be transpiled using babel according to configuration in `babel.config.cjs` file.

> ⚠️ CommonJS support is removed from this template. Transpiler will only generate EcmaScript modules.

### Minify the Output

This step uses [UglifyJS](https://github.com/mishoo/UglifyJS) to minify the contents of `dist` directory.
You can modify the options for UglifyJS in `scripts/build/commands/minify.js` file.

<p align="right">(<a href="#top">back to top</a>)</p>

# Other

## ReadMe Template

I have used [Best-README-Template](https://github.com/othneildrew/Best-README-Template) as a starting point for this file.

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/certainlyAria/typescript-starter.svg
[contributors-url]: https://github.com/certainlyAria/typescript-starter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/certainlyAria/typescript-starter.svg
[forks-url]: https://github.com/certainlyAria/typescript-starter/network/members
[stars-shield]: https://img.shields.io/github/stars/certainlyAria/typescript-starter.svg
[stars-url]: https://github.com/certainlyAria/typescript-starter/stargazers
[issues-shield]: https://img.shields.io/github/issues-raw/certainlyAria/typescript-starter.svg
[issues-url]: https://github.com/certainlyAria/typescript-starter/issues
[license-shield]: https://img.shields.io/github/license/certainlyAria/typescript-starter.svg
[license-url]: https://github.com/certainlyAria/typescript-starter/blob/master/LICENSE
