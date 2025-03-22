import { style } from "@vanilla-extract/css";
import { breakpoints } from "../../styles/tokens";

export const container = style({
  minWidth: `${breakpoints.tablet}px`,
  boxSizing: "border-box",
});
