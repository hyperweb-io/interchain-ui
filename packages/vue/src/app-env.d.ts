// Workaround for importing images
declare module "*.svg" {
  const svgContent: string;
  export default svgContent;
}

declare module "*.png" {
  const pngContent: string;
  export default pngContent;
}

// Workaround for Vue SFC compiler: Failed to resolve index type into finite keys
import { createRainbowSprinkles } from "rainbow-sprinkles";

export const rainbowSprinkles: ReturnType<typeof createRainbowSprinkles>;

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0];
