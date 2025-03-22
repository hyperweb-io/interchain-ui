import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/themes.css";

export const container = style({
  width: "464px"
})

export const img = style({
  width: themeVars.space[8],
  height: themeVars.space[8],
  borderRadius: themeVars.radii.lg,
});
