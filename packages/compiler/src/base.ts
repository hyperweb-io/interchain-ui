import { globSync } from "glob";
import fsPromise from "fs/promises";
import fs from "fs-extra";
import path from "node:path";
import { cwd } from "node:process";
import commandLineArgs from "command-line-args";
import ora from "ora";
import { Event } from "@parcel/watcher";
// @ts-ignore
import compileCommand from "@builder.io/mitosis-cli/dist/commands/compile";
import camelCase from "lodash/camelCase";
import startCase from "lodash/startCase";
import {
  reactScaffoldConfig,
  vueScaffoldConfig,
  compileAllowList,
} from "./scaffold.config.js";
import { Cache } from "./cache";
import { fixReactTypeIssues } from "./utils/react.utils";
import log from "./log";

const { print, filesystem, strings } = require("gluegun");

// Add fs alias to prevent linter errors when accessing fs methods
const fsSync = fs;

const cache = new Cache();

type ValidTarget = "react" | "vue";

export type CustomReplaceProps = {
  name: string;
  pascalName: string;
  outFile: string;
  outPath: string;
  isFirstCompilation: boolean;
};

interface CompileOptions {
  elements: string | string[];
  dest: string;
  options: Record<string, unknown>;
  target: string;
  extension: string;
  state: string;
  styles: string;
  api?: string;
  isDev?: boolean;
  customReplace?: (props: CustomReplaceProps) => void;
}

const DEFAULT_OPTIONS: CompileOptions = {
  elements: "src/**/*.lite.tsx",
  dest: "packages",
  options: {},
  target: "",
  extension: "",
  state: "",
  styles: "",
};

const optionDefinitions = [
  { name: "elements", alias: "e", type: String, multiple: true },
  { name: "dev", type: Boolean },
];

function applyFixReactTypeIssues(
  content: string,
  filePath: string,
  target: string,
): string {
  if (target === "react" && !filePath.endsWith(".lite.tsx")) {
    return fixReactTypeIssues(content);
  }
  return content;
}

function stripVueJsxExtension(filePath: string): string {
  // .lite.tsx file is processed by Mitosis compiler
  if (filePath.endsWith(".lite.tsx")) {
    return filePath;
  }

  return filePath.endsWith(".tsx")
    ? filePath.replace(/\.tsx$/, ".ts")
    : filePath;
}

interface CompileParams {
  watcherEvents?: Event[];
  [key: string]: unknown;
}

interface CliConfig {
  elements?: string[];
  dev?: boolean;
}

export async function compile(rawOptions: CompileParams): Promise<void> {
  const { watcherEvents, ...defaultOptions } = rawOptions;

  const options: CompileOptions = {
    ...DEFAULT_OPTIONS,
    ...(defaultOptions as Partial<CompileOptions>),
  };

  const cliConfig = commandLineArgs(optionDefinitions) as CliConfig;

  // String or array of strings of glob patterns
  const elementsFilter = cliConfig.elements
    ? cliConfig.elements
    : options.elements;

  options.elements = elementsFilter;
  options.isDev = Boolean(cliConfig.dev);

  const files = cliConfig.elements
    ? options.elements
    : globSync(options.elements);

  const targetAllowList =
    compileAllowList[options.target as ValidTarget] || undefined;

  const filteredGlobbedFiles = targetAllowList
    ? (files as string[]).filter((file: string) => {
        return (targetAllowList ?? [])
          .map(
            (allowedElement) =>
              `src/ui/${allowedElement}/${allowedElement}.lite.tsx`,
          )
          .some((allowed) => allowed === file);
      })
    : files;

  const outPath = `${options.dest}/${options.target}`;

  // Create a silent spinner that doesn't output to console
  const spinner = ora({
    text: `>> Compiling [${options.target}]`,
    // Use a null stream to prevent output
    stream: process.stderr,
    // Disable the spinner to prevent output
    isEnabled: false,
  }).start();

  // Create a compilation group to keep all logs together
  const compileGroup = log.group(`${options.target.toUpperCase()} Compilation`);

  // Log compilation start
  compileGroup.info(`Starting compilation for ${options.target.toUpperCase()}`);

  // Save original stdout.write
  const originalStdoutWrite = process.stdout.write;
  const originalStderrWrite = process.stderr.write;

  // Create a filter function to prevent file path logging
  const filterOutput = (
    chunk: Buffer | string,
    encoding: BufferEncoding,
    callback?: (err?: Error) => void,
  ): boolean => {
    const str = chunk.toString();
    // Only allow our log messages through
    if (
      str.includes("[Group:") ||
      str.includes("Compiling") ||
      str.includes("Compiled")
    ) {
      return originalStdoutWrite.call(
        process.stdout,
        chunk,
        encoding,
        callback,
      );
    }
    return true;
  };

  try {
    // Redirect stdout to filter out file paths
    process.stdout.write = filterOutput as any;
    process.stderr.write = filterOutput as any;

    for (const fileName of filteredGlobbedFiles) {
      const isFirstCompilation =
        !fs.existsSync(`${outPath}/src`) || options.isDev;
      const file = path.parse(fileName);
      const name = file.name.replace(".lite", "");

      // Copying files
      const { inDir, outDir } = getScaffoldsDirs(outPath);
      const scaffoldsExist = fs.existsSync(inDir);

      copyNonMitosisLiteFiles(
        options,
        outPath,
        cliConfig,
        targetAllowList,
        isFirstCompilation,
        scaffoldsExist,
      );

      if (scaffoldsExist) {
        fs.copySync(inDir, outDir);

        // For Vue, we need to rename .tsx files to .vue and copy the hooks
        if (options.target === "vue") {
          const scaffoldFiles = globSync(`${outDir}/**/*.tsx`);
          scaffoldFiles.forEach((file) => {
            const newFile = file.replace(/\.tsx$/, ".vue");
            fs.renameSync(file, newFile);
          });

          // Copy hooks to the correct location
          const hooksDir = path.join(inDir, "hooks");
          const vueHooksDir = path.join(outPath, "src", "ui", "hooks");
          if (fs.existsSync(hooksDir)) {
            fs.copySync(hooksDir, vueHooksDir);
          }
        }
      }

      const changed = await cache.isChanged(fileName);

      if (!changed) {
        continue;
      }

      // Compile using Mitosis CLI
      const { outFile } = await compileMitosisComponent(
        fileName,
        options,
        outPath,
      );

      replacePropertiesFromCompiledFiles(outFile);

      if (typeof options.customReplace === "function") {
        options.customReplace({
          outFile,
          isFirstCompilation,
          name,
          pascalName: toPascalName(name),
          outPath,
        });
      }

      // Update spinner text but don't log it directly
      spinner.text = `[Done] ${fileName}`;
    }

    if (watcherEvents) {
      await handleWatcherEvents(
        watcherEvents,
        options,
        outPath,
        cliConfig,
        targetAllowList,
      );
    }

    if (!cache.isPopulated && files) {
      await cache.build(Array.isArray(files) ? files : [files]);
    }

    // Call the new function for both React and Vue
    await addFrameworkSpecificPatches(options);

    spinner.succeed();
    compileGroup.success(
      `Compilation for ${options.target.toUpperCase()} completed successfully`,
    );
  } catch (error) {
    compileGroup.error(
      `Compilation error: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    // Restore original stdout.write
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;

    spinner.stop();
    compileGroup.end();
  }
}

function toPascalName(str: string): string {
  return startCase(str).replace(/\s/g, "");
}

function getScaffoldsDirs(rootPath: string): { inDir: string; outDir: string } {
  return {
    inDir: `${rootPath}/scaffolds`,
    outDir: `${rootPath}/src/ui`,
  };
}

function removeLiteExtension(fileContent: string): string {
  return fileContent.replace(/\.lite/g, "");
}

function toArray<T>(maybeArray: T | T[]): T[] {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function addVueExtension(inputString: string): string {
  return inputString.replace(/(\.[^"';\s]+)("|')/g, "$1.vue$2");
}

async function copyFiles(srcDir: string, destDir: string): Promise<void> {
  try {
    // Ensure the destination directory exists, if not create it
    await fs.mkdir(destDir, { recursive: true });

    // Read all the files from the source directory
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      // Construct full file paths for both the source and destination
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      // Check if the source is indeed a file and not a directory
      const stat = await fs.stat(srcFile);
      if (stat.isFile()) {
        // Copy each file to the destination directory
        await fs.copyFile(srcFile, destFile);
      }
    }
  } catch (error) {
    log.error(
      `Error copying files: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function copyNonMitosisLiteFiles(
  options: CompileOptions,
  outPath: string,
  cliConfig: CliConfig,
  targetAllowList: string[] | undefined,
  isFirstRun = false,
  scaffoldsExist = false,
): void {
  if (!isFirstRun) {
    return;
  }

  // Move src to all the package folder
  const srcFiles = globSync("src/**/*");
  const allowList = compileAllowList[options.target as ValidTarget];
  const doesTargetHaveAllowList = allowList != null;

  // Use a silent copy process that doesn't log file paths
  srcFiles.forEach((file: string) => {
    const relativePath = path.relative("src", file);
    let destPath = path.join(outPath, "src", relativePath);

    if (doesTargetHaveAllowList && !file.startsWith("src/ui/shared")) {
      const isAllowed = allowList.some(
        (allowed: string) =>
          file.includes(`src/ui/${allowed}/`) || !file.startsWith("src/ui/"),
      );
      if (!isAllowed) return;
    }

    if (fs.lstatSync(file).isDirectory()) {
      fs.ensureDirSync(destPath);
    } else {
      if (options.target === "vue") {
        destPath = stripVueJsxExtension(destPath);
      }
      fs.copySync(file, destPath);
    }
  });

  // For Vue, we need to add .vue to the export statement
  if (options.target === "vue") {
    const reExportIndexFiles = globSync(`${outPath}/src/ui/**/index.ts`);

    reExportIndexFiles.forEach((indexFile: string) => {
      const data = fs.readFileSync(indexFile, "utf8");
      const result = addVueExtension(data);
      fs.writeFileSync(indexFile, result, "utf8");
    });

    copyFiles(`${outPath}/typings`, `${outPath}/src`);
  }

  // Remove unnecessary files moved
  const unnecessaryFiles = globSync(`${outPath}/src/**/*.lite.tsx`);
  unnecessaryFiles.forEach((element: string) => fs.removeSync(element));

  // Output file to <package>/src
  const targetSrcFiles = globSync(`${outPath}/src/**/*.{ts,tsx}`);

  targetSrcFiles.forEach((element: string) => {
    const data = fs.readFileSync(element, "utf8");

    let result = removeLiteExtension(
      // Fix alias
      data.replace(/\~\//g, "../../"),
    );

    result = applyFixReactTypeIssues(result, element, options.target);

    fs.writeFileSync(element, result, "utf8");
  });

  let fileExports = "$2";

  // Export only the elements we want with matching filters:
  // - CLI flag --elements
  // - allowList
  if (cliConfig.elements || doesTargetHaveAllowList) {
    const filterWithAllowList = (elements: string | string[]): string[] => {
      const elementsToFilter = doesTargetHaveAllowList
        ? (targetAllowList ?? []).map(
            (allowedElement: string) =>
              `src/ui/${allowedElement}/${allowedElement}.lite.tsx`,
          )
        : toArray(elements);

      return elementsToFilter;
    };

    fileExports = filterWithAllowList(options.elements)
      .map((fileName: string) => {
        const file = path.parse(fileName);
        const name = file.name.replace(".lite", "");
        return `export { default as ${toPascalName(
          name,
        )} } from './${file.dir.replace("src/", "")}';`;
      })
      .join("\n");
  }

  const indexData = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

  let indexResult = indexData
    // Export only needed components
    .replace(
      /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
      `$1\n${fileExports}\n$3`,
    )
    .replace(/Platform.Default/g, `Platform.${toPascalName(options.target)}`);

  // Adding scaffolds imports to index.ts
  if (scaffoldsExist) {
    const scaffoldConfig =
      options.target === "vue" ? vueScaffoldConfig : reactScaffoldConfig;
    const scaffoldNames = Object.keys(scaffoldConfig).map((name) => ({
      name,
      Comp: toPascalName(name),
    }));

    const scaffoldImports = scaffoldNames
      .map((item) => {
        const importPath =
          options.target === "vue"
            ? `./ui/${item.name}/${item.name}.vue`
            : `./ui/${item.name}`;
        return `export { default as ${item.Comp} } from '${importPath}';`;
      })
      .join("\n");

    indexResult = indexResult.replace(
      /(\/\/ Init Components)(.+?)(\/\/ End Components)/s,
      `$1$2${scaffoldImports}\n$3`,
    );
  }

  fs.writeFileSync(`${outPath}/src/index.ts`, indexResult, "utf8");
}

async function handleWatcherEvents(
  watcherEvents: Event[],
  options: CompileOptions,
  outPath: string,
  cliConfig: CliConfig,
  targetAllowList: string[] | undefined,
): Promise<void> {
  if (!watcherEvents || watcherEvents.length === 0) return;

  // Process events in batches to reduce I/O operations
  const eventsByType = {
    liteTsxComponents: [] as Event[],
    scaffolds: [] as Event[],
    otherFiles: [] as Event[],
  };

  // Group events by type for batch processing
  for (const event of watcherEvents) {
    const parsedPath = path.parse(event.path);
    const isLiteJSXComponent =
      parsedPath.ext === ".tsx" && parsedPath.name.includes(".lite");
    const isScaffold = parsedPath.dir.includes("scaffolds");

    if (isLiteJSXComponent) {
      eventsByType.liteTsxComponents.push(event);
    } else if (isScaffold) {
      eventsByType.scaffolds.push(event);
    } else {
      eventsByType.otherFiles.push(event);
    }
  }

  // Process regular files (non-lite, non-scaffold)
  if (eventsByType.otherFiles.length > 0) {
    const fileOperations = eventsByType.otherFiles.map(async (event) => {
      const parsedPath = path.parse(event.path);

      let targetPath = path.join(
        outPath,
        parsedPath.dir.slice(parsedPath.dir.indexOf("src")),
        parsedPath.base,
      );

      if (options.target === "vue") {
        targetPath = stripVueJsxExtension(targetPath);
      }

      if (event.type === "create" || event.type === "update") {
        try {
          const fileContent = await fsPromise.readFile(event.path, "utf-8");

          // Apply transformations once
          const transformedContent = applyFixReactTypeIssues(
            removeLiteExtension(fileContent),
            event.path,
            options.target,
          );

          await fsPromise.mkdir(path.dirname(targetPath), { recursive: true });
          await fsPromise.writeFile(targetPath, transformedContent);
        } catch (err) {
          log.error(
            `Error processing ${path.basename(event.path)}: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      } else if (event.type === "delete") {
        try {
          // Check if file exists before attempting to delete
          if (fsSync.existsSync(targetPath)) {
            await fsPromise.unlink(targetPath);
          }
        } catch (err) {
          log.error(
            `Error deleting ${path.basename(targetPath)}: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      }
    });

    // Process all file operations in parallel
    await Promise.all(fileOperations);
  }

  // Handle lite components with Mitosis compilation
  if (eventsByType.liteTsxComponents.length > 0) {
    for (const event of eventsByType.liteTsxComponents) {
      if (event.type === "create" || event.type === "update") {
        try {
          await compileMitosisComponent(event.path, options, outPath);
        } catch (err) {
          log.error(
            `Error compiling ${path.basename(event.path)}: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      }
    }
  }

  // Handle scaffolds if needed
  if (eventsByType.scaffolds.length > 0) {
    copyNonMitosisLiteFiles(
      options,
      outPath,
      cliConfig,
      targetAllowList,
      false,
      true,
    );
  }
}

async function compileMitosisComponent(
  filepath: string,
  options: CompileOptions,
  outPath: string,
): Promise<{ outFile: string }> {
  const file = path.parse(filepath);
  const outFile = `${outPath}/${file.dir}/${file.name.replace(".lite", "")}.${
    options.extension
  }`;

  const to =
    options.target === "webcomponents" ? "webcomponent" : options.target;

  const configPath = path.resolve(__dirname, "./mitosis.config.js");

  await compileCommand.run({
    parameters: {
      options: {
        from: "mitosis",
        to: to,
        out: outFile,
        force: true,
        state: options.state,
        styles: options.styles,
        api: options.api,
        outFile: outPath,
        config: configPath,
      },
      array: [filepath],
    },
    strings: strings,
    filesystem: filesystem,
    print: print,
  });

  return {
    outFile,
  };
}

async function addFrameworkSpecificPatches(
  options: CompileOptions,
): Promise<void> {
  const targetRootPath = path.resolve(cwd(), `packages/${options.target}/src`);
  const indexPath = path.resolve(targetRootPath, "index.ts");
  const hooksPath = path.resolve(targetRootPath, "ui", "hooks");

  return fsPromise
    .readdir(hooksPath)
    .then((hookFolders) => {
      const hookNamesByFolder = hookFolders.reduce(
        (arr: { folder: string; hookName: string }[], folder: string) => {
          arr.push({ folder, hookName: camelCase(folder) });
          return arr;
        },
        [],
      );

      const indexData = fs.readFileSync(indexPath, "utf8");

      const hooksExports = hookNamesByFolder
        .map((item) => {
          if (options.target === "vue") {
            // Due to SFC compiler not understanding the barrel file, we need to import the hooks manually
            return `export { default as ${item.hookName} } from './ui/hooks/${item.folder}/${item.folder}';`;
          } else {
            return `export { default as ${item.hookName} } from './ui/hooks/${item.folder}';`;
          }
        })
        .filter((exportLine) => {
          // Don't include exports if it's already there
          return indexData.indexOf(exportLine) === -1;
        })
        .join("\n");

      let indexResult = indexData;

      if (options.target === "react") {
        const clientOnlyMarker = `import "client-only";`;
        indexResult = `${indexData}\n${clientOnlyMarker}\n${hooksExports}`;
      } else if (options.target === "vue") {
        // For Vue, we don't need the client-only import
        indexResult = `${indexData}\n${hooksExports}`;
      }

      // Skip if the result is the same as the original
      if (indexResult === indexData) {
        return;
      }

      fs.writeFileSync(indexPath, indexResult, "utf8");
    })
    .catch((err) => {
      log.error(
        `Failed to add ${options.target} specific patches: ${err instanceof Error ? err.message : String(err)}`,
      );
    });
}

function replacePropertiesFromCompiledFiles(outFile: string): void {
  const data = fs.readFileSync(outFile, "utf8");
  const result = data
    // Fix alias
    .replace(/\~\//g, "../../");

  fs.writeFileSync(outFile, result, "utf8");
}
