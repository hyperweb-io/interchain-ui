import fs from "fs-extra";
import { globSync } from "glob";
import * as compiler from "../base";
import log from "../log";
import type { CustomReplaceProps } from "../base";
import { compileAllowList } from "../scaffold.config";

const DEFAULT_OPTIONS = {
  target: "vue",
  extension: "vue",
  api: "composition",
  state: "",
  styles: "",
};

// Keep track of processed components to avoid duplicate logs
const processedComponents = new Set<string>();

function customReplaceVue(props: CustomReplaceProps): void {
  const { name, pascalName, outFile, outPath, isFirstCompilation } = props;

  // Skip if we've already processed this component
  if (processedComponents.has(outFile)) {
    return;
  }

  // Mark as processed
  processedComponents.add(outFile);

  // Use the group logging feature to ensure all logs for this component stay together
  const componentLogger = log.group(`Vue Component: ${pascalName}`);

  try {
    componentLogger.info(`Compiling ${name} [${pascalName}] for Vue...`);

    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, "utf8");

      if (data) {
        componentLogger.info("Processing index.ts");

        const result = data
          // Add .vue to index and filter by compileAllowList
          .replace(
            /(export)(.*)\/ui\/(?!.*(\.css|\.css\.ts)")(.+)";/g,
            (match, p1, p2, p3, p4) => {
              const componentName = p4.split("/").pop();
              return compileAllowList["vue"]?.includes(componentName)
                ? `${p1}${p2}/ui/${componentName}/${componentName}.vue";`
                : "";
            },
          )
          .replace(/(extensions)\/(.*)\.vue/g, "$1/$2")
          .replace(/\/helpers\.vue/g, "")
          // Add .vue and a subpath to each export, and filter by compileAllowList
          .replace(
            /(export { default as (\w+) } from '\.\/ui\/)([^';]+)';/g,
            (match, p1, p2, p3) => {
              return compileAllowList["vue"]?.includes(p3)
                ? `${p1}${p3}/${p3}.vue';`
                : "";
            },
          )
          // Remove empty lines created by filtered out exports
          .replace(/^\s*[\r\n]/gm, "");

        fs.writeFileSync(`${outPath}/src/index.ts`, result, "utf8");

        // Add .vue extension to all the indexes in src folder
        globSync(`${outPath}/src/ui/**/index.ts`).forEach((src: string) => {
          const data = fs
            .readFileSync(src, "utf8")
            // add vue to index
            .replace(/(export { default } from)(.*)(';)/g, "$1$2.vue$3")
            // but remove from hooks
            .replace(/\.hook\.vue/g, ".hook");

          fs.writeFileSync(src, data, "utf8");
        });
      }
    }

    componentLogger.success(`Compiled ${pascalName} successfully`);
  } catch (error) {
    componentLogger.error(
      `Error processing ${pascalName}: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    componentLogger.end();
  }
}

const compileVue = async (): Promise<void> => {
  // Clear the processed components set for a fresh compilation
  processedComponents.clear();

  const compileLogger = log.group("Vue Compilation");

  try {
    await compiler.compile({
      ...DEFAULT_OPTIONS,
      customReplace: customReplaceVue,
    });
    compileLogger.success("Vue compilation completed successfully");
  } catch (error) {
    compileLogger.error(
      `Vue compilation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    compileLogger.end();
  }
};

if (require.main === module) {
  // Call directly through CLI
  (async () => {
    await compileVue();
  })();
}

// Mitosis don't understand the destructure of someFn({...props}) yet, so it outputs `props.props`, we only need `props`
function patchPropsDestructuring(inputString: string): string {
  return inputString.replace(/props\.props/g, "props");
}

// ==================== Patching SFC compiler typescript issue ====================
// The following code is a patch for the SFC compiler issue that causes the types to be incorrectly resolved
// in short, non-trivial types must be inlined in the .vue templates and can't be accessed by referencing an external file normally like in React apps
// import type { SomeType } from "./SomeType"; <-- this doesn't work in .vue files
// More info at: https://github.com/vuejs/core/issues/8286
function getAllTheInterfacesFromPropsInComponent(
  result: string,
  pascalName: string,
): Record<string, string> {
  const regex1 = /interface\s+([^{]+){([^}]+)}/g;
  const interfacesWithProps: Record<string, string> = {};
  let match;

  while ((match = regex1.exec(result)) !== null) {
    const [interfaceDef] = match;
    const interfaceName = interfaceDef
      .split("{")[0]
      .replace(/\n\s*/g, "")
      .replace(/\{/g, "")
      .replace(/interface/g, "")
      .replace(/(extends)/g, " $1")
      .replace(/(\r\n|\n|\r)/g, " ")
      .trim();

    if (interfaceName.includes("Props")) {
      interfacesWithProps[interfaceName] = match[2].trim();
    }
  }

  return interfacesWithProps;
}

function searchComponentPropsInterface(
  result: string,
  interfacesWithProps: Record<string, string>,
  pascalName: string,
): string[] {
  const interfaceSearchResult = Object.entries(interfacesWithProps).find(
    ([interfaceName]) => interfaceName.includes(pascalName),
  );

  const [currentInterfacePropsName = "", currentInterfacePropsContent = ""] =
    interfaceSearchResult ?? [];

  const extensions = currentInterfacePropsName
    .replace(/.*extends/, "")
    .trim()
    .split(",")
    .map((e) => e.trim());

  const interfacesContent = [
    "// Original props \n",
    currentInterfacePropsContent,
  ];

  extensions.forEach((extension) => {
    let extensionName = extension;
    let replacers: string | null = null;

    // If the extension has generics
    if (extension.includes("<")) {
      extensionName = extension.replace(/<.*>/g, "<T>");
      const generics = extension.match(/<.*>/g);
      replacers = generics && generics[0].replace(/</g, "").replace(/>/g, "");
    }

    let content = interfacesWithProps[extensionName];

    if (replacers) {
      content = content.replace(/T/g, replacers);
    }

    interfacesContent.push(`// Props from ${extensionName}\n`);
    interfacesContent.push(content);
  });

  return interfacesContent;
}

function addNewPropsInterfacesForComponent(
  result: string,
  interfacesContent: string[],
  pascalName: string,
): string {
  // Create the new props interface
  const newPropsInterface = ` ${pascalName}Props {${interfacesContent.join("\n")}}`;

  // Deprecate the old props interface
  return (
    result
      // Deprecate the old props interface
      .replace(
        `export interface ${pascalName}Props`,
        `interface __${pascalName}Props__`,
      )
      // Add the new props interface
      .replace(
        `interface __${pascalName}Props__`,
        `// This interface is auto generated to join the interfaces \nexport interface ${newPropsInterface}\n\ninterface __${pascalName}Props__`,
      )
  );
}

function mergeAllPropsInterfaceIntoNewInterface(
  result: string,
  pascalName: string,
): string {
  const interfacesWithProps = getAllTheInterfacesFromPropsInComponent(
    result,
    pascalName,
  );
  const interfacesContent = searchComponentPropsInterface(
    result,
    interfacesWithProps,
    pascalName,
  );
  return addNewPropsInterfacesForComponent(
    result,
    interfacesContent,
    pascalName,
  );
}
