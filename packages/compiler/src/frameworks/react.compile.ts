import fs from "fs-extra";
import { Event } from "@parcel/watcher";
import * as compiler from "../base";
import { fixReactTypeIssues } from "../utils/react.utils";
import log from "../log";
import type { CustomReplaceProps } from "../base";

const DEFAULT_OPTIONS = {
  target: "react",
  extension: "tsx",
  state: "useState",
  styles: "style-tag",
};

// Keep track of processed components to avoid duplicate logs
const processedComponents = new Set<string>();

function customReplaceReact(props: CustomReplaceProps): void {
  const { name, pascalName, outFile } = props;

  // Skip if we've already processed this component
  if (processedComponents.has(outFile)) {
    return;
  }

  // Mark as processed
  processedComponents.add(outFile);

  // Use the group logging feature to ensure all logs for this component stay together
  const componentLogger = log.group(`React Component: ${pascalName}`);

  try {
    componentLogger.info(`Compiling ${name} [${pascalName}] for React...`);

    const data = fs.readFileSync(outFile, "utf8");
    const result = fixReactTypeIssues(data);
    fs.writeFileSync(outFile, result, "utf8");

    componentLogger.success(`Compiled ${pascalName} successfully`);
  } catch (error) {
    componentLogger.error(
      `Error processing ${pascalName}: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    componentLogger.end();
  }
}

async function compileReact(watcherEvents?: Event[]): Promise<void> {
  // Clear the processed components set for a fresh compilation
  processedComponents.clear();

  const compileLogger = log.group("React Compilation");

  try {
    await compiler.compile({
      ...DEFAULT_OPTIONS,
      watcherEvents: watcherEvents as Event[],
      customReplace: customReplaceReact,
    });
    compileLogger.success("React compilation completed successfully");
  } catch (error) {
    compileLogger.error(
      `React compilation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    compileLogger.end();
  }
}

export { compileReact };

if (require.main === module) {
  // Call directly through CLI
  (async () => {
    await compileReact();
  })();
}
