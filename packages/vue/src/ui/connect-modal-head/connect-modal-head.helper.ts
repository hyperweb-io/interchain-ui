import { ComponentOverrideSchema } from "../../styles/override/override.types";
import { titleColorVar } from "./connect-modal-head.css";

export const connectModalHeadTitleOverrides: ComponentOverrideSchema = {
  name: "connect-modal-head-title",
  overrides: [[titleColorVar, "color"]],
};
