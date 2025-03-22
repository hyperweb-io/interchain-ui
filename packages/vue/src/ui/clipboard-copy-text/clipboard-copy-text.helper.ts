import { borderColorVar, colorVar } from "./clipboard-copy-text.css";
import { ComponentOverrideSchema } from "../../styles/override/override.types";

export const clipboardCopyTextOverrides: ComponentOverrideSchema = {
  name: "clipboard-copy-text",
  overrides: [
    [colorVar, "color"],
    [borderColorVar, "borderColor"],
  ],
};
