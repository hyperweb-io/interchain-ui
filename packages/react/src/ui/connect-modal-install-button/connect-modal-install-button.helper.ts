import { ComponentOverrideSchema } from "../../styles/override/override.types";
import {
  borderColorVar,
  bgVar,
  colorVar,
  shadowVar,
} from "./connect-modal-install-button.css";

export const installButtonOverrides: ComponentOverrideSchema = {
  name: "connect-modal-install-button",
  overrides: [
    [bgVar, "bg"],
    [borderColorVar, "borderColor"],
    [colorVar, "color"],
    [shadowVar, "shadow"],
  ],
};
