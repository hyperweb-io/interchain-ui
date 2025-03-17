import { Listr } from "listr2";
import commandLineArgs from "command-line-args";
import util from "util";
import { exec as execCallback } from "child_process";
import { command as execa } from "execa";
import ora from "ora";

const exec = util.promisify(execCallback);

interface CliConfig {
  elements?: string[];
  platforms: string[];
  lint: boolean;
  "no-lint"?: boolean;
  concurrency?: number;
}

const optionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: "elements", alias: "e", type: String, multiple: true },
  {
    name: "platforms",
    alias: "p",
    type: String,
    multiple: true,
    defaultValue: ["react", "vue"], // TODO: add more targets below
    // defaultValue: ["angular", "react", "solid", "svelte", "vue"],
  },
  { name: "lint", type: Boolean, defaultValue: true },
  { name: "no-lint", type: Boolean },
  {
    name: "concurrency",
    alias: "c",
    type: Number,
    defaultValue: 4, // Default to 4 concurrent processes
  },
];

// Add a comment for clarity even though we removed the description property
// concurrency: Number of concurrent compilation processes (1-8)

const shouldMinify = process.env.MINIFY === "true";
const shouldSkipBundling = process.env.NO_BUILD === "true";

(async () => {
  const startTime = Date.now();
  const cliConfig = commandLineArgs(optionDefinitions) as CliConfig;
  cliConfig.lint = cliConfig.lint && !cliConfig["no-lint"]; // TODO: add linting

  // Limit concurrency to reasonable values
  if (
    cliConfig.concurrency &&
    (cliConfig.concurrency < 1 || cliConfig.concurrency > 8)
  ) {
    console.warn(
      `Concurrency value ${cliConfig.concurrency} is out of range (1-8), defaulting to 4`,
    );
    cliConfig.concurrency = 4;
  }

  const tasks = new Listr([
    {
      title: "Pretasks",
      task: () => {
        return new Listr(
          [
            {
              title: "Clean output",
              task: (_, task) => {
                const platforms = Array.isArray(cliConfig.platforms)
                  ? cliConfig.platforms
                  : [cliConfig.platforms];

                const platformPkgRoot =
                  platforms.length === 1
                    ? `${platforms}`
                    : `{${platforms.join(",")}}`;

                const cleanCmd = `rimraf packages/${platformPkgRoot}/{src,dist,lib,types,stats.html}`;
                task.output = `Cleaning dir: ${cleanCmd}`;
                return exec(cleanCmd).catch((error) => {
                  console.error(`Error cleaning directories: ${error.message}`);
                  // Continue even if cleaning fails
                  return Promise.resolve();
                });
              },
            },
          ],
          { concurrent: true },
        );
      },
    },
    {
      title: `Compile Mitosis Elements: ${
        cliConfig.elements?.join(", ") || "all"
      }`,
      task: () => {
        const spinner = ora("Preparing compilation...").start();

        return new Listr(
          cliConfig.platforms.map((platform) => ({
            title: `Compile ${platform}`,
            task: () => {
              spinner.text = `Compiling ${platform}...`;
              return execa(
                `tsx packages/compiler/src/frameworks/${platform}.compile.ts ${
                  cliConfig.elements
                    ? `--elements ${cliConfig.elements.join(" ")}`
                    : ""
                }`,
              )
                .catch((error: Error) => {
                  spinner.fail(`Error compiling ${platform}`);
                  throw new Error(
                    `Error compiling ${platform} ${error.message}`,
                  );
                })
                .finally(() => {
                  spinner.succeed(`Compiled ${platform}`);
                });
            },
          })),
          {
            concurrent: cliConfig.concurrency || true,
            exitOnError: false, // Continue with other platforms if one fails
          },
        );
      },
    },
    {
      title: `Bundle Packages: ${cliConfig.platforms?.join(", ") || ""}`,
      task: async (_, task) => {
        if (shouldSkipBundling) {
          task.skip("Skipping bundling (NO_BUILD=true)");
          return;
        }

        const platforms = Array.isArray(cliConfig.platforms)
          ? cliConfig.platforms
          : [cliConfig.platforms];

        const platformGlob =
          platforms.length === 1
            ? platforms
            : `{${cliConfig.platforms.join(",")}}`;

        const filters = `--filter "@interchain-ui/${platformGlob}"`;

        const buildCmd = `pnpm run --stream ${filters} build`;
        task.output = `Running: ${buildCmd}`;

        try {
          await exec(buildCmd);

          if (shouldMinify) {
            const minifyCssCmd = `pnpm run --stream ${filters} minifyCss`;
            task.output = `Running: ${minifyCssCmd}`;
            await exec(minifyCssCmd);
          }
        } catch (error) {
          throw new Error(`Error bundling packages ${error}`);
        }
      },
    },
  ]);

  tasks
    .run()
    .then(() => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      console.log(`🚀 Compilation completed in ${duration.toFixed(2)}s`);
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
})();
