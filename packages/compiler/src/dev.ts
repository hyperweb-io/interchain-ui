import { Listr, ListrTask } from "listr2";
import path from "path";
import ora from "ora";
import watcher, { Event } from "@parcel/watcher";
import lodash from "lodash";
import { compileReact } from "./frameworks/react.compile";
import { command as execa } from "execa";

// Track pending compilation operations
const pendingOperations = {
  isCompiling: false,
  events: [] as Event[],
};

(async () => {
  let unsub: (() => void) | undefined;

  // Add this block
  process.on("SIGINT", () => {
    console.log("\nReceived SIGINT. Cleaning up...");
    if (unsub) unsub();
    process.exit(0);
  });

  const tasks = new Listr([
    {
      title: "Clean output",
      task: () =>
        execa("pnpm run clear:artifacts && pnpm run clear:builds").catch(() => {
          throw new Error("Cannot remove output directory");
        }),
    },
    {
      title: "Compile React Components",
      task: () =>
        compileReact().catch((error: Error) => {
          throw new Error(
            "[Dev] Error task compile react components " + error.message,
          );
        }),
    },
    {
      title: "Watching /src ...",
      task: () => {
        const compileWithCancelToken = (
          watcherEvents: Event[],
          token: { cancel: () => void },
        ) => {
          return new Promise<void>((resolve, reject) => {
            compileReact(watcherEvents).then(resolve).catch(reject);

            token.cancel = function () {
              reject(new Error("Cancelled"));
            };
          });
        };

        const compile = last(compileWithCancelToken);

        return new Listr([
          {
            title: "Recompile Mitosis",
            task: async () => {
              const srcDir = path.resolve(process.cwd(), "src");
              const scaffoldDir = path.resolve(
                process.cwd(),
                "packages/react/scaffolds",
              );

              // Enhanced event handler with batching
              const handleEvents = async (events: Event[]): Promise<void> => {
                // Add new events to pending batch
                pendingOperations.events.push(...events);

                // If already compiling, just return - the events have been queued
                if (pendingOperations.isCompiling) {
                  return;
                }

                pendingOperations.isCompiling = true;
                const spinner = ora(`Watching src/ for changes...`).start();
                spinner.text = `src/ changed, compiling...`;

                const t = +Date.now();
                const timingLabel = `[t:${t}] Recompile took`;
                console.time(timingLabel);

                try {
                  // Process all accumulated events
                  const eventsToProcess = [...pendingOperations.events];
                  pendingOperations.events = []; // Clear the queue

                  await compile(eventsToProcess, { cancel: () => {} });
                  spinner.succeed("Compiled successfully.");
                  console.timeEnd(timingLabel);
                } catch (e) {
                  const error = e as Error;
                  spinner.fail(`Error compiling mitosis ${error.message}.`);
                } finally {
                  pendingOperations.isCompiling = false;

                  // If more events accumulated while we were compiling, process them now
                  if (pendingOperations.events.length > 0) {
                    // Small delay to prevent potential rapid consecutive compilations
                    setTimeout(() => handleEvents([]), 100);
                  }

                  spinner.stop();
                }
              };

              // Smart debounce with shorter delay for initial changes and longer for subsequent changes
              const onChange = lodash.debounce(
                (err: Error | null, events: Array<watcher.Event>) => {
                  if (err) {
                    console.error(
                      `Error watching for changes: ${err?.message}`,
                    );
                    return;
                  }

                  // Filter out irrelevant events (like .DS_Store files)
                  const relevantEvents = events.filter(
                    (event) =>
                      !event.path.includes(".DS_Store") &&
                      !event.path.includes(".git/"),
                  );

                  if (relevantEvents.length === 0) return;

                  handleEvents(relevantEvents);
                },
                300, // Shorter debounce time for better responsiveness
                {
                  leading: false,
                  trailing: true,
                  maxWait: 1000, // Maximum wait time for batching
                },
              );

              const watchSrc = watcher.subscribe(srcDir, (err, events) => {
                onChange(err, events);
                return () => {};
              });

              const watchScaffold = watcher.subscribe(
                scaffoldDir,
                (err, events) => {
                  onChange(err, events);
                  return () => {};
                },
              );

              return Promise.all([watchSrc, watchScaffold]).then(
                (subscriptions) => {
                  unsub = () => {
                    subscriptions.forEach((subscription) => {
                      if (
                        subscription &&
                        typeof subscription.unsubscribe === "function"
                      ) {
                        subscription.unsubscribe();
                      }
                    });
                  };
                },
              );
            },
          } as ListrTask,
        ]);
      },
    },
  ]);

  tasks.run().catch((err: Error) => {
    if (unsub) unsub();
    console.error(err);
    process.exit(1);
  });
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function last<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const lastToken = { cancel: () => {} }; // start with no op

  return function executor(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> {
    lastToken.cancel();
    args.push(lastToken as never);
    return fn.apply(this, args);
  };
}
